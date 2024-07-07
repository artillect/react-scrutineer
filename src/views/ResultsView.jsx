import React, { useState, useMemo, useEffect } from 'react';
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
  const { dancers, scores, competitions, currentCompetition } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('');

  const currentCompetitionData = useMemo(() => 
    competitions.find(comp => comp.id === currentCompetition),
    [competitions, currentCompetition]
  );

  useEffect(() => {
    if (currentCompetitionData && currentCompetitionData.categories.length > 0) {
      setSelectedCategory(currentCompetitionData.categories[0]);
    }
  }, [currentCompetitionData]);

  const groupedDancers = useMemo(() => {
    if (!selectedCategory || !currentCompetitionData) return {};

    console.log('Grouping dancers for category:', selectedCategory);
    console.log('Current competition:', currentCompetitionData.name);
    console.log('All dancers:', dancers);

    const filteredDancers = dancers.filter(dancer => {
      const isInCategory = dancer.category === selectedCategory;
      const isInCompetition = dancer.competitions?.includes(currentCompetition);
      console.log(`Dancer ${dancer.name}: category match = ${isInCategory}, competition match = ${isInCompetition}`);
      return isInCategory && isInCompetition;
    });

    console.log('Filtered dancers:', filteredDancers);

    const grouped = filteredDancers.reduce((acc, dancer) => {
      const ageGroups = currentCompetitionData.ageGroups[selectedCategory] || [];
      console.log('Available age groups:', ageGroups);

      const ageGroup = ageGroups.find(ag => {
        const minAge = parseInt(ag.minAge) || 0;
        const maxAge = parseInt(ag.maxAge) || Infinity;
        const dancerAge = parseInt(dancer.age);
        const isInAgeGroup = dancerAge >= minAge && dancerAge <= maxAge;
        console.log(`Checking ${dancer.name} (age ${dancerAge}) against group ${ag.name}: ${isInAgeGroup}`);
        return isInAgeGroup;
      });

      if (ageGroup) {
        if (!acc[ageGroup.name]) acc[ageGroup.name] = [];
        acc[ageGroup.name].push(dancer);
      } else {
        console.log(`No age group found for dancer ${dancer.name} (age ${dancer.age})`);
      }
      return acc;
    }, {});

    console.log('Grouped dancers:', grouped);
    return grouped;
  }, [dancers, selectedCategory, currentCompetitionData, currentCompetition]);


  const calculateResults = (dancersGroup) => {
    const categoryDances = currentCompetitionData?.dances[selectedCategory] || [];
    
    const dancerResults = dancersGroup.map(dancer => {
      const dancerScores = categoryDances.map(dance => {
        const danceScores = currentCompetitionData?.judges.map(judge => ({
          judge,
          score: parseFloat(scores[currentCompetition]?.[dancer.id]?.[dance]?.[judge] || 0)
        }));

        const hasScore = danceScores?.some(ds => ds.score > 0);

        if (!hasScore) {
          return { dance, hasScore, totalPoints: 0, judgePlacings: [] };
        }

        // Sort dancers by each judge's scores to determine placings
        const judgePlacings = danceScores?.map(judgeScore => {
          const placing = dancersGroup.filter(d => 
            parseFloat(scores[currentCompetition]?.[d.id]?.[dance]?.[judgeScore.judge] || 0) > judgeScore.score
          ).length + 1;
          return { ...judgeScore, placing, points: convertToPoints(placing) };
        });

        const totalPoints = judgePlacings?.reduce((sum, jp) => sum + jp.points, 0) || 0;
        const totalScore = danceScores?.reduce((sum, ds) => sum + ds.score, 0) || 0;

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

  console.log('Current Competition Data:', currentCompetitionData);
  console.log('Selected Category:', selectedCategory);
  console.log('Grouped Dancers:', groupedDancers);

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        <div className="space-x-2">
          {currentCompetitionData?.categories.map(category => (
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

      {selectedCategory && Object.keys(groupedDancers).length === 0 && (
        <p>No dancers found for the selected category.</p>
      )}

      {selectedCategory && Object.entries(groupedDancers).map(([ageGroupName, dancersGroup]) => {
        const results = calculateResults(dancersGroup);
        return (
          <Card key={ageGroupName} className="mb-4">
            <CardHeader>
              <CardTitle>{`${currentCompetitionData.name} ${selectedCategory} - ${ageGroupName}`}</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <p>No results available for this age group.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Place</TableHead>
                      <TableHead>Number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Total Points</TableHead>
                      {currentCompetitionData?.dances[selectedCategory].map(dance => (
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
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Enhanced Debugging Information */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Debugging Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Current Competition: {currentCompetitionData?.name || 'None'}</p>
          <p>Selected Category: {selectedCategory}</p>
          <p>Number of Age Groups: {Object.keys(groupedDancers).length}</p>
          <p>Total Dancers: {Object.values(groupedDancers).flat().length}</p>
          <h3 className="mt-2 font-bold">Age Groups for {selectedCategory}:</h3>
          <ul>
            {currentCompetitionData?.ageGroups[selectedCategory]?.map(ag => (
              <li key={ag.name}>{ag.name} (Min: {ag.minAge}, Max: {ag.maxAge || 'No limit'})</li>
            )) || 'No age groups defined'}
          </ul>
          <h3 className="mt-2 font-bold">Dancers in Competition:</h3>
          <ul>
            {dancers.filter(d => d.competitions?.includes(currentCompetition)).map(d => (
              <li key={d.id}>{d.name} (Category: {d.category}, Age: {d.age})</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsView;