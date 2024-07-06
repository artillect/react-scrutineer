import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DancerManagement from './views/DancerManagement';
import CompetitionSetup from './views/CompetitionSetup';
import ScoringView from './views/ScoringView';
import ResultsView from './views/ResultsView';
import AwardManagement from './views/AwardManagement';
import { AppProvider } from './contexts/AppContext';

const App = () => {
  const [activeView, setActiveView] = useState('dancers');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dancers':
        return <DancerManagement />;
      case 'setup':
        return <CompetitionSetup />;
      case 'scoring':
        return <ScoringView />;
      case 'results':
        return <ResultsView />;
      case 'awards':
        return <AwardManagement />;
      default:
        return null;
    }
  };

  return (
    <AppProvider>
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
    </AppProvider>
  );
};

export default App;