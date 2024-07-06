import React, { useState, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const convertToPoints = (place) => {
  switch(place) {
    case 1: return 137;
    case 2: return 91;
    case 3: return 71;
    case 4: return 53;
    case 5: return 37;
    case 6: return 23;
    default: return 0;
  }
};

const ResultsView = () => {
  const { categories, ageGroups, dances, dancers, judges, scores } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('');

  const groupedDancers = useMemo(() => {
    if (!selectedCategory) return {};

    return dancers
      .filter(dancer => dancer.category === selectedCategory)
      .reduce((acc, dancer) => {
        const ageGroup = ageGroups[selectedCategory].find(ag => 
          parseInt(dancer.age) >= parseInt(ag.minAge) && 
          parseInt(dancer.age) <= (ag.maxAge ? parseInt(ag.maxAge) : Infinity)
        );
        if (ageGroup) {
          if (!acc[ageGroup.name]) acc[ageGroup.name] = [];
          acc[ageGroup.name].push(dancer);
        }
        return acc;
      }, {});
  }, [dancers, selectedCategory, ageGroups]);

  const calculateResults = (dancersGroup) => {
    const categoryDances = dances[selectedCategory];
    
    const dancerResults = dancersGroup.map(dancer => {
      const dancerScores = categoryDances.map(dance => {
        const danceScores = judges.map(judge => ({
          judge,
          score: parseFloat(scores[dancer.id]?.[dance]?.[judge] || 0)
        }));

        const hasScore = danceScores.some(ds => ds.score > 0);

        if (!hasScore) {
          return { dance, hasScore, totalPoints: 0, judgePlacings: [] };
        }

        // Sort dancers by each judge's scores to determine placings
        const judgePlacings = danceScores.map(judgeScore => {
          const placing = dancersGroup.filter(d => 
            parseFloat(scores[d.id]?.[dance]?.[judgeScore.judge] || 0) > judgeScore.score
          ).length + 1;
          return { ...judgeScore, placing, points: convertToPoints(placing) };
        });

        const totalPoints = judgePlacings.reduce((sum, jp) => sum + jp.points, 0);
        const totalScore = danceScores.reduce((sum, ds) => sum + ds.score, 0);

        return {
          dance,
          judgePlacings,
          totalPoints,
          totalScore,
          hasScore
        };
      });

      const totalPoints = dancerScores.reduce((sum, ds) => sum + ds.totalPoints, 0);
      const firstPlaces = dancerScores.filter(ds => ds.hasScore && ds.judgePlacings.some(jp => jp.placing === 1)).length;

      return {
        ...dancer,
        danceResults: dancerScores,
        totalPoints,
        firstPlaces
      };
    });

    // Filter out dancers with no points and sort by total points
    const sortedResults = dancerResults
      .filter(dancer => dancer.totalPoints > 0)
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
        if (b.firstPlaces !== a.firstPlaces) return b.firstPlaces - a.firstPlaces;
        // If still tied, we'll leave them tied
        return 0;
      });

    // Assign final placings, accounting for ties
    let currentPlace = 1;
    for (let i = 0; i < sortedResults.length; i++) {
      if (i > 0 && (
        sortedResults[i].totalPoints !== sortedResults[i-1].totalPoints ||
        sortedResults[i].firstPlaces !== sortedResults[i-1].firstPlaces
      )) {
        currentPlace = i + 1;
      }
      sortedResults[i].finalPlace = currentPlace;
    }

    return sortedResults;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        <div className="space-x-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {selectedCategory && Object.entries(groupedDancers).map(([ageGroupName, dancersGroup]) => {
        const results = calculateResults(dancersGroup);
        if (results.length === 0) return null; // Don't display empty groups

        return (
          <Card key={ageGroupName} className="mb-4">
            <CardHeader>
              <CardTitle>{`Results for ${selectedCategory} - ${ageGroupName}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Place</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Total Points</TableHead>
                    {dances[selectedCategory].map(dance => (
                      <TableHead key={dance}>{dance}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((dancer) => (
                    <TableRow key={dancer.id}>
                      <TableCell>{getOrdinal(dancer.finalPlace)}</TableCell>
                      <TableCell>{dancer.number}</TableCell>
                      <TableCell>{dancer.name}</TableCell>
                      <TableCell>{dancer.totalPoints}</TableCell>
                      {dancer.danceResults.map(result => (
                        <TableCell key={result.dance}>
                          {result.hasScore ? (
                            <>
                              {result.totalPoints}
                              <br />
                              <small>({result.judgePlacings.map(jp => jp.placing).join(',')})</small>
                            </>
                          ) : '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ResultsView;