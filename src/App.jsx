import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import EventManagement from './views/EventManagement';
import CompetitionSetup from './views/CompetitionSetup';
import DancerManagement from './views/DancerManagement';
import ScoringView from './views/ScoringView';
import ResultsView from './views/ResultsView';
import { AppProvider } from './contexts/AppContext';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('event');

  const renderView = () => {
    switch (activeView) {
      case 'event':
        return <EventManagement />;
      case 'setup':
        return <CompetitionSetup />;
      case 'dancers':
        return <DancerManagement />;
      case 'scoring':
        return <ScoringView />;
      case 'results':
        return <ResultsView />;
      default:
        return <EventManagement />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <main className="flex-1 overflow-y-auto p-4">
          {renderView()}
        </main>
      </div>
    </AppProvider>
  );
};

export default App;