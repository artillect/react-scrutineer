// /src/contexts/AppContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { INITIAL_AGE_GROUPS, INITIAL_DANCES, INITIAL_CHAMPIONSHIP_AGE_GROUPS, INITIAL_PREMIERSHIP, SAMPLE_DANCERS, INITIAL_COMPETITION } from '../utils/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dancers, setDancers] = useState(SAMPLE_DANCERS.map(dancer => ({
    ...dancer,
    competitions: ['comp_001']
  })));
  const [categories, setCategories] = useState(Object.keys(INITIAL_AGE_GROUPS));
  const [ageGroups, setAgeGroups] = useState(INITIAL_AGE_GROUPS);
  const [dances, setDances] = useState(INITIAL_DANCES);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChampionship, setHasChampionship] = useState(false);
  const [hasPremiership, setHasPremiership] = useState(false);
  const [championshipAgeGroups, setChampionshipAgeGroups] = useState(INITIAL_CHAMPIONSHIP_AGE_GROUPS);
  const [championshipDances, setChampionshipDances] = useState(INITIAL_DANCES.championship);
  const [premiership, setPremiership] = useState(INITIAL_PREMIERSHIP);
  const [scores, setScores] = useState({});
  const [competitions, setCompetitions] = useState([INITIAL_COMPETITION]);
  const [judges, setJudges] = useState(INITIAL_COMPETITION.judges);
  const [currentCompetition, setCurrentCompetition] = useState(INITIAL_COMPETITION.id);

  const value = {
    competitions, setCompetitions,
    currentCompetition, setCurrentCompetition,
    dancers, setDancers,
    categories, setCategories,
    ageGroups, setAgeGroups,
    dances, setDances,
    judges, setJudges,
    isEditing, setIsEditing,
    hasChampionship, setHasChampionship,
    hasPremiership, setHasPremiership,
    championshipAgeGroups, setChampionshipAgeGroups,
    championshipDances, setChampionshipDances,
    premiership, setPremiership,
    scores, setScores,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};