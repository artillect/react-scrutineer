import React, { useCallback } from 'react';
import { PlusCircle, Pencil, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AgeGroupEditor from '../components/AgeGroupEditor';
import DanceSelector from '../components/DanceSelector';
import { useAppContext } from '../contexts/AppContext';

const CompetitionSetup = () => {
  const {
    isEditing, setIsEditing,
    ageGroups, setAgeGroups,
    dances, setDances,
    hasChampionship, setHasChampionship,
    hasPremiership, setHasPremiership,
    championshipAgeGroups, setChampionshipAgeGroups,
    championshipDances, setChampionshipDances,
    premiership, setPremiership,
    judges, setJudges
  } = useAppContext();

  const handleAgeGroupChange = useCallback((category, action, index, updatedGroup) => {
    setAgeGroups(prev => {
      const newGroups = [...prev[category]];
      switch (action) {
        case 'add':
          newGroups.push({ name: 'New Age Group', minAge: '', maxAge: '' });
          break;
        case 'update':
          newGroups[index] = updatedGroup;
          break;
        case 'delete':
          newGroups.splice(index, 1);
          break;
      }
      return { ...prev, [category]: newGroups };
    });
  }, [setAgeGroups]);

  const handleChampionshipAgeGroupChange = useCallback((action, index, updatedGroup) => {
    setChampionshipAgeGroups(prev => {
      switch (action) {
        case 'add':
          return [...prev, { name: 'New Age Group', minAge: '', maxAge: '' }];
        case 'update':
          return prev.map((group, i) => i === index ? updatedGroup : group);
        case 'delete':
          return prev.filter((_, i) => i !== index);
        default:
          return prev;
      }
    });
  }, [setChampionshipAgeGroups]);

  const handleDanceChange = useCallback((category, newDances) => {
    setDances(prev => ({ ...prev, [category]: newDances }));
  }, [setDances]);

  const handlePremiershigeGroupChange = useCallback((action, index, updatedGroup) => {
    setPremiership(prev => {
      const newAgeGroups = [...prev.ageGroups];
      switch (action) {
        case 'add':
          newAgeGroups.push({ name: 'New Age Group', minAge: '', maxAge: '' });
          break;
        case 'update':
          newAgeGroups[index] = updatedGroup;
          break;
        case 'delete':
          newAgeGroups.splice(index, 1);
          break;
      }
      return { ...prev, ageGroups: newAgeGroups };
    });
  }, [setPremiership]);

  const renderAgeGroups = useCallback((groups, onUpdate, onDelete) => (
    <div>
      {groups.map((group, index) => (
        <AgeGroupEditor
          key={index}
          ageGroup={group}
          onChange={(updatedGroup) => onUpdate(index, updatedGroup)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  ), []);

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
      
      {/* Judges */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Judges</h3>
        {isEditing ? (
          <div>
            {judges.map((judge, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={judge}
                  onChange={(e) => {
                    const newJudges = [...judges];
                    newJudges[index] = e.target.value;
                    setJudges(newJudges);
                  }}
                  className="border p-1 mr-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setJudges(judges.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJudges([...judges, `Judge ${judges.length + 1}`])}
            >
              <PlusCircle size={16} className="mr-1" /> Add Judge
            </Button>
          </div>
        ) : (
          <p>{judges.join(', ')}</p>
        )}
      </div>
      
      {/* Regular Competition Setup */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Regular Competition</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Age Groups</TableHead>
            <TableHead>Dances</TableHead>
            {isEditing && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(ageGroups).map(([category, groups]) => (
            <TableRow key={category}>
              <TableCell className="capitalize">{category}</TableCell>
              <TableCell>
                {isEditing ? (
                  <>
                    {renderAgeGroups(
                      groups,
                      (index, updatedGroup) => handleAgeGroupChange(category, 'update', index, updatedGroup),
                      (index) => handleAgeGroupChange(category, 'delete', index)
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleAgeGroupChange(category, 'add')}>
                      <PlusCircle size={16} className="mr-1" /> Add Age Group
                    </Button>
                  </>
                ) : (
                  groups.map(group => group.name).join(', ')
                )}
              </TableCell>
              <TableCell>
                {isEditing ? (
                  <DanceSelector
                    category={category === 'beginner' || category === 'novice' ? 'beginnerNovice' : category}
                    selectedDances={dances[category]}
                    onChange={(newDances) => handleDanceChange(category, newDances)}
                  />
                ) : (
                  dances[category].join(', ')
                )}
              </TableCell>
              {isEditing && (
                <TableCell>
                  {/* Add any additional actions here if needed */}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Championship Setup */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Championship Setup</h3>
        <label className="flex items-center mb-4">
          <Checkbox
            checked={hasChampionship}
            onCheckedChange={setHasChampionship}
          />
          <span className="ml-2">Include Championship</span>
        </label>
        {hasChampionship && (
          <div>
            <h4 className="text-md font-semibold mb-2">Championship Age Groups</h4>
            {isEditing ? (
              <>
                {renderAgeGroups(
                  championshipAgeGroups,
                  (index, updatedGroup) => handleChampionshipAgeGroupChange('update', index, updatedGroup),
                  (index) => handleChampionshipAgeGroupChange('delete', index)
                )}
                <Button variant="outline" size="sm" onClick={() => handleChampionshipAgeGroupChange('add')}>
                  <PlusCircle size={16} className="mr-1" /> Add Championship Age Group
                </Button>
              </>
            ) : (
              <p>{championshipAgeGroups.map(group => group.name).join(', ')}</p>
            )}
            <h4 className="text-md font-semibold mt-4 mb-2">Championship Dances</h4>
            {isEditing ? (
              <DanceSelector
                category="championship"
                selectedDances={championshipDances}
                onChange={setChampionshipDances}
              />
            ) : (
              <p>{championshipDances.join(', ')}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Premiership Setup */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Premiership Setup</h3>
        <label className="flex items-center mb-4">
          <Checkbox
            checked={hasPremiership}
            onCheckedChange={setHasPremiership}
          />
          <span className="ml-2">Include Premiership</span>
        </label>
        {hasPremiership && (
          <div>
            <h4 className="text-md font-semibold mb-2">Premiership Age Groups</h4>
            {isEditing ? (
              <>
                {renderAgeGroups(
                  premiership.ageGroups,
                  (index, updatedGroup) => handlePremiershigeGroupChange('update', index, updatedGroup),
                  (index) => handlePremiershigeGroupChange('delete', index)
                )}
                <Button variant="outline" size="sm" onClick={() => handlePremiershigeGroupChange('add')}>
                  <PlusCircle size={16} className="mr-1" /> Add Premiership Age Group
                </Button>
              </>
            ) : (
              <p>{premiership.ageGroups.map(group => group.name).join(', ')}</p>
            )}
            <h4 className="text-md font-semibold mt-4 mb-2">Premiership Dances</h4>
            {isEditing ? (
              <DanceSelector
                category="premiership"
                selectedDances={premiership.dances}
                onChange={(newDances) => setPremiership(prev => ({ ...prev, dances: newDances }))}
              />
            ) : (
              <p>{premiership.dances.join(', ')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionSetup;