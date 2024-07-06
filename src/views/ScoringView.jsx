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
  const { categories, ageGroups, dances, dancers, judges, scores, setScores } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');

  useEffect(() => {
    if (selectedCategory && ageGroups[selectedCategory].length > 0) {
      setSelectedAgeGroup(ageGroups[selectedCategory][0].name);
    } else {
      setSelectedAgeGroup('');
    }
  }, [selectedCategory, ageGroups]);

  const filteredDancers = useMemo(() => {
    if (!selectedCategory || !selectedAgeGroup) return [];
    
    const selectedAgeGroupData = ageGroups[selectedCategory].find(ag => ag.name === selectedAgeGroup);
    if (!selectedAgeGroupData) return [];

    const minAge = parseInt(selectedAgeGroupData.minAge) || 0;
    const maxAge = parseInt(selectedAgeGroupData.maxAge) || Infinity;

    return dancers.filter(dancer => 
      dancer.category === selectedCategory &&
      parseInt(dancer.age) >= minAge &&
      parseInt(dancer.age) <= maxAge
    );
  }, [dancers, selectedCategory, selectedAgeGroup, ageGroups]);

  const handleScoreChange = (dancerId, danceId, judgeId, score) => {
    setScores(prevScores => ({
      ...prevScores,
      [dancerId]: {
        ...prevScores[dancerId],
        [danceId]: {
          ...prevScores[dancerId]?.[danceId],
          [judgeId]: score
        }
      }
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="w-1/3 pr-4">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {selectedCategory && (
            <AgeGroupSelector
              ageGroups={ageGroups}
              selectedCategory={selectedCategory}
              selectedAgeGroup={selectedAgeGroup}
              setSelectedAgeGroup={setSelectedAgeGroup}
            />
          )}
        </div>
        <div className="w-2/3">
          {selectedCategory && selectedAgeGroup && dances[selectedCategory].map(dance => (
            <DanceScoreCard
              key={dance}
              dance={dance}
              dancers={filteredDancers}
              judges={judges}
              scores={scores}
              onScoreChange={handleScoreChange}
            />
          ))}
        </div>
      </div>
      
      {/* Debugging section */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-bold mb-2">Debugging Information</h3>
        <p>Total dancers: {dancers.length}</p>
        <p>Selected category: {selectedCategory}</p>
        <p>Selected age group: {selectedAgeGroup}</p>
        <p>Filtered dancers: {filteredDancers.length}</p>
        <h4 className="text-md font-bold mt-4 mb-2">All Dancers:</h4>
        <ul>
          {dancers.map(dancer => (
            <li key={dancer.id}>
              {dancer.name} - Category: {dancer.category}, Age: {dancer.age}
            </li>
          ))}
        </ul>
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