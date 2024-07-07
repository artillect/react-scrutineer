// /src/views/EventManagement.jsx
import React from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppContext } from '../contexts/AppContext';

const COMPETITION_TYPES = {
  REGULAR: 'Regular',
  CHAMPIONSHIP: 'Championship',
  PREMIERSHIP: 'Premiership',
  PRE_CHAMPIONSHIP: 'Pre-Championship',
  CHOREOGRAPHY: 'Choreography',
  MASTER_CLASS: 'Master Class'
};

const EventManagement = () => {
  const { 
    competitions, 
    setCompetitions, 
    currentCompetition, 
    setCurrentCompetition 
  } = useAppContext();

  const handleAddCompetition = () => {
    const newCompetition = {
      id: Date.now(),
      name: `New Competition ${competitions.length + 1}`,
      type: COMPETITION_TYPES.REGULAR,
      categories: ['primary', 'beginner', 'novice', 'intermediate', 'premier'],
      ageGroups: {},
      dances: {},
      numJudges: 1,
      judges: ['Judge Name']
    };
    setCompetitions([...competitions, newCompetition]);
    setCurrentCompetition(newCompetition.id);
  };

  const handleDeleteCompetition = (id) => {
    setCompetitions(competitions.filter(comp => comp.id !== id));
    if (currentCompetition === id) {
      setCurrentCompetition(competitions[0]?.id || null);
    }
  };

  const handleSelectCompetition = (id) => {
    setCurrentCompetition(id);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Event Management</h2>
      <Button onClick={handleAddCompetition} className="mb-4">
        <PlusCircle size={16} className="mr-2" /> Add Competition
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitions.map(competition => (
          <Card 
            key={competition.id} 
            className={`cursor-pointer ${currentCompetition === competition.id ? 'border-blue-500' : ''}`}
            onClick={() => handleSelectCompetition(competition.id)}
          >
            <CardHeader>
              <CardTitle>{competition.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {competition.type}</p>
              <p>Categories: {competition.categories.join(', ')}</p>
              <p>Number of Judges: {competition.numJudges}</p>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCompetition(competition.id);
                }}
                className="mt-2"
              >
                <Trash2 size={16} className="mr-2" /> Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;