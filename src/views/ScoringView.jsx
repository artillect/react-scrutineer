// /src/views/ScoringView.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAppContext } from '../contexts/AppContext';

const CategorySelector = ({ categories, selectedCategory, setSelectedCategory }) => (
  <>
    <h2 className="text-xl font-bold mb-2">Categories</h2>
    <div className="space-y-2">
      {categories.map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  </>
);

const AgeGroupSelector = ({ ageGroups, selectedCategory, selectedAgeGroup, setSelectedAgeGroup }) => (
  <>
    <h2 className="text-xl font-bold mt-4 mb-2">Age Groups</h2>
    <div className="space-y-2">
      {ageGroups[selectedCategory].map(ageGroup => (
        <Button
          key={ageGroup.name}
          variant={selectedAgeGroup === ageGroup.name ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => setSelectedAgeGroup(ageGroup.name)}
        >
          {ageGroup.name}
        </Button>
      ))}
    </div>
  </>
);

const ScoreInput = ({ value, onChange }) => (
  <Input
    type="number"
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
  />
);

const DanceScoreCard = ({ dance, dancers, judges, scores, onScoreChange }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{dance}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>Dancer</TableHead>
            {judges.map(judge => (
              <TableHead key={judge}>{judge}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dancers.map(dancer => (
            <TableRow key={dancer.id}>
              <TableCell>{dancer.number}</TableCell>
              <TableCell>{dancer.name}</TableCell>
              {judges.map(judge => (
                <TableCell key={judge}>
                  <ScoreInput
                    value={scores[dancer.id]?.[dance]?.[judge]}
                    onChange={(value) => onScoreChange(dancer.id, dance, judge, value)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const ScoringView = () => {
  const { categories, ageGroups, dances, dancers, judges, scores, setScores, competitions, currentCompetition } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');

  const currentCompetitionData = useMemo(() => 
    competitions.find(comp => comp.id === currentCompetition),
    [competitions, currentCompetition]
  );

  useEffect(() => {
    if (currentCompetitionData && currentCompetitionData.categories.length > 0) {
      setSelectedCategory(currentCompetitionData.categories[0]);
      setSelectedAgeGroup(currentCompetitionData.categories[0][0]);
    }
  }, [currentCompetitionData]);

  const filteredDancers = useMemo(() => {
    if (!selectedCategory || !selectedAgeGroup || !currentCompetitionData) return [];
    
    const selectedAgeGroupData = currentCompetitionData.ageGroups[selectedCategory]?.find(ag => ag.name === selectedAgeGroup);
    if (!selectedAgeGroupData) return [];

    const minAge = parseInt(selectedAgeGroupData.minAge) || 0;
    const maxAge = parseInt(selectedAgeGroupData.maxAge) || Infinity;

    return dancers.filter(dancer => 
      dancer.category === selectedCategory &&
      parseInt(dancer.age) >= minAge &&
      parseInt(dancer.age) <= maxAge &&
      dancer.competitions?.includes(currentCompetition)
    );
  }, [dancers, selectedCategory, selectedAgeGroup, currentCompetitionData, currentCompetition]);

  const handleScoreChange = (dancerId, danceId, judgeId, score) => {
    setScores(prevScores => ({
      ...prevScores,
      [currentCompetition]: {
        ...prevScores[currentCompetition],
        [dancerId]: {
          ...prevScores[currentCompetition]?.[dancerId],
          [danceId]: {
            ...prevScores[currentCompetition]?.[dancerId]?.[danceId],
            [judgeId]: score
          }
        }
      }
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="w-1/3 pr-4">
          <CategorySelector
            categories={currentCompetitionData?.categories || []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {selectedCategory && currentCompetitionData?.ageGroups?.[selectedCategory] && (
            <AgeGroupSelector
              ageGroups={currentCompetitionData?.ageGroups || {}}
              selectedCategory={selectedCategory}
              selectedAgeGroup={selectedAgeGroup}
              setSelectedAgeGroup={setSelectedAgeGroup}
            />
          )}
        </div>
        <div className="w-2/3 h-screen overflow-auto">
          {selectedCategory && selectedAgeGroup && currentCompetitionData?.dances[selectedCategory]?.map(dance => (
            <DanceScoreCard
              key={dance}
              dance={dance}
              dancers={filteredDancers}
              judges={currentCompetitionData.judges || []}
              scores={scores[currentCompetition] || {}}
              onScoreChange={handleScoreChange}
            />
          ))}
        </div>
      </div>
      
      {/* Debugging section */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-bold mb-2">Debugging Information</h3>
        <p>Current Competition: {currentCompetitionData?.name || 'None selected'}</p>
        <p>Total dancers: {dancers.length}</p>
        <p>Selected category: {selectedCategory}</p>
        <p>Selected age group: {selectedAgeGroup}</p>
        <p>Filtered dancers: {filteredDancers.length}</p>
        <h4 className="text-md font-bold mt-4 mb-2">Filtered Dancers:</h4>
        <ul>
          {filteredDancers.map(dancer => (
            <li key={dancer.id}>
              {dancer.name} - Category: {dancer.category}, Age: {dancer.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScoringView;