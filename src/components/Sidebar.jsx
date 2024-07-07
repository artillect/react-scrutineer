import React from 'react';
import { Users, ClipboardList, BarChart2, Settings, Home, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '../contexts/AppContext';

const Sidebar = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  const { currentEvent, currentCompetition, competitions } = useAppContext();

  const menuItems = [
    { icon: <Home size={24} />, label: 'Event Management', value: 'event' },
    { icon: <ClipboardList size={24} />, label: 'Competition Setup', value: 'setup' },
    { icon: <Users size={24} />, label: 'Dancers', value: 'dancers' },
    { icon: <PenTool size={24} />, label: 'Scoring', value: 'scoring' },
    { icon: <BarChart2 size={24} />, label: 'Results', value: 'results' },
  ];

  const currentCompetitionName = competitions.find(c => c.id === currentCompetition)?.name || 'No competition selected';

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col p-3`}>
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          className="p-2 text-white w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '←' : '→'}
        </Button>
        {isOpen && (
          <div className="ml-2 overflow-hidden">
            <div className="font-bold text-sm truncate">{currentEvent?.name || 'Event Name'}</div>
            <div className="text-xs text-gray-300 truncate">{currentCompetitionName}</div>
          </div>
        )}
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activeView === item.value ? "secondary" : "ghost"}
            className={`w-full justify-start mb-2 py-2 px-0`}
            onClick={() => setActiveView(item.value)}
          >
            <div className="flex items-center w-full">
              <div className="w-10 h-10 flex items-center justify-center">
                {item.icon}
              </div>
              {isOpen && <span className="ml-2">{item.label}</span>}
            </div>
          </Button>
        ))}
      </nav>
      <Button
        variant="ghost"
        className="w-full justify-start mt-auto py-2 px-0"
        onClick={() => setActiveView('settings')}
      >
        <div className="flex items-center w-full">
          <div className="w-10 h-10 flex items-center justify-center">
            <Settings size={24} />
          </div>
          {isOpen && <span className="ml-2">App Settings</span>}
        </div>
      </Button>
    </div>
  );
};

export default Sidebar;
