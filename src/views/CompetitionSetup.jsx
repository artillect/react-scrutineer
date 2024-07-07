import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AgeGroupEditor from '../components/AgeGroupEditor';
import DanceSelector from '../components/DanceSelector';
import { useAppContext } from '../contexts/AppContext';

const COMPETITION_TYPES = {
  REGULAR: 'Regular',
  CHAMPIONSHIP: 'Championship',
  PREMIERSHIP: 'Premiership',
  PRE_CHAMPIONSHIP: 'Pre-Championship',
  CHOREOGRAPHY: 'Choreography',
  MASTER_CLASS: 'Master Class'
};

const ALL_CATEGORIES = ['primary', 'beginner', 'novice', 'intermediate', 'premier'];

const CompetitionSetup = () => {
  const { competitions, setCompetitions, currentCompetition } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editingJudgeIndex, setEditingJudgeIndex] = useState(null);

  const currentCompetitionData = competitions.find(comp => comp.id === currentCompetition);

  const handleUpdateCompetition = (updates) => {
    setCompetitions(competitions.map(comp => 
      comp.id === currentCompetition ? { ...comp, ...updates } : comp
    ));
  };

  useEffect(() => {
    if (currentCompetitionData && !currentCompetitionData.judges) {
      handleUpdateCompetition({ judges: ['Judge Name'] });
    }
  }, [currentCompetitionData, handleUpdateCompetition]);


  const handleCategoryToggle = (category) => {
    const updatedCategories = currentCompetitionData.categories.includes(category)
      ? currentCompetitionData.categories.filter(c => c !== category)
      : [...currentCompetitionData.categories, category];
    handleUpdateCompetition({ categories: updatedCategories });
  };

  const handleAgeGroupChange = (category, action, index, updatedGroup) => {
    const newAgeGroups = { ...currentCompetitionData.ageGroups };
    const groupsForCategory = newAgeGroups[category] || [];

    switch (action) {
      case 'add':
        groupsForCategory.push({ name: 'New Age Group', minAge: '', maxAge: '' });
        break;
      case 'update':
        groupsForCategory[index] = updatedGroup;
        break;
      case 'delete':
        groupsForCategory.splice(index, 1);
        break;
    }

    newAgeGroups[category] = groupsForCategory;
    handleUpdateCompetition({ ageGroups: newAgeGroups });
  };

  const handleDanceChange = (category, newDances) => {
    const newDancesObj = { ...currentCompetitionData.dances, [category]: newDances };
    handleUpdateCompetition({ dances: newDancesObj });
  };

  const handleAddJudge = () => {
    const newJudges = [...currentCompetitionData.judges, `Judge ${currentCompetitionData.judges.length + 1}`];
    handleUpdateCompetition({ judges: newJudges });
  };

  const handleRemoveJudge = (index) => {
    const newJudges = currentCompetitionData.judges.filter((_, i) => i !== index);
    handleUpdateCompetition({ judges: newJudges });
  };

  const handleEditJudge = (index, newName) => {
    const newJudges = [...currentCompetitionData.judges];
    newJudges[index] = newName;
    handleUpdateCompetition({ judges: newJudges });
    setEditingJudgeIndex(null);
  };

  if (!currentCompetitionData) {
    return <div>No competition selected</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Competition Setup</h2>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsEditing(!isEditing)}
        className="mb-4"
      >
        {isEditing ? (
          <>
            <Check size={16} className="mr-1" /> Done Editing
          </>
        ) : (
          <>
            <Pencil size={16} className="mr-1" /> Edit Competition Setup
          </>
        )}
      </Button>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{currentCompetitionData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <>
              <Input
                value={currentCompetitionData.name}
                onChange={(e) => handleUpdateCompetition({ name: e.target.value })}
                className="mb-2"
              />
              <Select
                value={currentCompetitionData.type}
                onValueChange={(value) => handleUpdateCompetition({ type: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select competition type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(COMPETITION_TYPES).map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            <>
              <p>Type: {currentCompetitionData.type}</p>
            </>
          )}

          <h3 className="text-lg font-semibold mt-4 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(category => (
              <Button
                key={category}
                variant={currentCompetitionData.categories.includes(category) ? "default" : "outline"}
                onClick={() => isEditing && handleCategoryToggle(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-2">Judges</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judge Name</TableHead>
                {isEditing && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompetitionData.judges.map((judge, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editingJudgeIndex === index ? (
                      <Input
                        value={judge}
                        onChange={(e) => handleEditJudge(index, e.target.value)}
                        onBlur={() => setEditingJudgeIndex(null)}
                        autoFocus
                      />
                    ) : (
                      judge
                    )}
                  </TableCell>
                  {isEditing && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingJudgeIndex(index)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveJudge(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddJudge}
              className="mt-2"
            >
              <PlusCircle size={16} className="mr-1" /> Add Judge
            </Button>
          )}

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Age Groups</TableHead>
                <TableHead>Dances</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompetitionData.categories.map(category => (
                <TableRow key={category}>
                  <TableCell className="capitalize">{category}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <>
                        {(currentCompetitionData.ageGroups[category] || []).map((group, index) => (
                          <AgeGroupEditor
                            key={index}
                            ageGroup={group}
                            onChange={(updatedGroup) => handleAgeGroupChange(category, 'update', index, updatedGroup)}
                            onDelete={() => handleAgeGroupChange(category, 'delete', index)}
                          />
                        ))}
                        <Button variant="outline" size="sm" onClick={() => handleAgeGroupChange(category, 'add')}>
                          <PlusCircle size={16} className="mr-1" /> Add Age Group
                        </Button>
                      </>
                    ) : (
                      (currentCompetitionData.ageGroups[category] || []).map(group => group.name).join(', ')
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <DanceSelector
                        category={category}
                        selectedDances={currentCompetitionData.dances[category] || []}
                        onChange={(newDances) => handleDanceChange(category, newDances)}
                      />
                    ) : (
                      (currentCompetitionData.dances[category] || []).join(', ')
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitionSetup;