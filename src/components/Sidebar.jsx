import React, { useMemo } from 'react';
import { Users, ClipboardList, BarChart2, Award, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  const menuItems = useMemo(() => [
    { icon: <ClipboardList size={24} />, label: 'Competition Setup', value: 'setup' },
    { icon: <Users size={24} />, label: 'Dancers', value: 'dancers' },
    { icon: <ClipboardList size={24} />, label: 'Scoring', value: 'scoring' },
    { icon: <BarChart2 size={24} />, label: 'Results', value: 'results' },
    { icon: <Award size={24} />, label: 'Awards', value: 'awards' },
  ], []);

  const handleToggleSidebar = () => {
    if (typeof setIsOpen === 'function') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col p-3`}>
      <Button 
        variant="ghost" 
        className="p-2 mb-4 text-white self-start w-10 h-10 flex items-center justify-center"
        onClick={handleToggleSidebar}
      >
        <Menu size={24} />
      </Button>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activeView === item.value ? "secondary" : "ghost"}
            className={`w-full justify-start mb-2 p-0`}
            onClick={() => setActiveView(item.value)}
          >
            <div className={`flex items-center ${isOpen ? 'w-full' : 'justify-center'}`}>
              <div className="w-10 h-10 flex items-center justify-center">
                {item.icon}
              </div>
              {isOpen && <span className="ml-2">{item.label}</span>}
            </div>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;