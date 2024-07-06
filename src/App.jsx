import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import DancerManagement from './views/DancerManagement';
import CompetitionSetup from './views/CompetitionSetup';
import ResultsCalculation from './views/ResultsCalculation';
import AwardManagement from './views/AwardManagement';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dancers');
  const [dancers, setDancers] = useState([]);
  const [nextNumber, setNextNumber] = useState(100);

  const handleRegister = useCallback((dancer) => {
    const newNumber = dancer.number || nextNumber.toString();
    if (dancers.some(d => d.number === newNumber)) {
      alert('This number is already taken. Please choose a different one.');
      return;
    }
    setDancers(prev => [...prev, { ...dancer, number: newNumber }]);
    setNextNumber(prev => Math.max(prev, parseInt(newNumber) + 1));
  }, [dancers, nextNumber]);

  const handleUpdate = useCallback((updatedDancer) => {
    setDancers(prev => prev.map(d => d.number === updatedDancer.number ? updatedDancer : d));
  }, []);

  const handleDelete = useCallback((number) => {
    setDancers(prev => prev.filter(d => d.number !== number));
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dancers':
        return <DancerManagement dancers={dancers} onRegister={handleRegister} onUpdate={handleUpdate} onDelete={handleDelete} />;
      case 'setup':
        return <CompetitionSetup />;
      case 'results':
        return <ResultsCalculation />;
      case 'awards':
        return <AwardManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <main className="flex-1 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Highland Dance Scrutineering</h1>
        {renderActiveView()}
      </main>
    </div>
  );
};

export default App;