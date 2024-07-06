import React, { useState, useEffect } from 'react';
import { Award, Users, ClipboardList, BarChart2, Menu, PlusCircle, Pencil, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Sidebar = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  const menuItems = [
    { icon: <Users size={24} />, label: 'Dancers', value: 'dancers' },
    { icon: <ClipboardList size={24} />, label: 'Competition Setup', value: 'setup' },
    { icon: <BarChart2 size={24} />, label: 'Results', value: 'results' },
    { icon: <Award size={24} />, label: 'Awards', value: 'awards' },
  ];

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col p-3`}>
      <Button 
        variant="ghost" 
        className={`p-2 mb-4 text-white self-start ${isOpen ? '' : 'w-10 h-10 flex items-center justify-center'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </Button>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activeView === item.value ? "secondary" : "ghost"}
            className={`w-full justify-start mb-2 ${isOpen ? 'px-3' : 'p-0'}`}
            onClick={() => setActiveView(item.value)}
          >
            <div className={`flex items-center ${isOpen ? 'w-full' : 'justify-center'}`}>
              <div className={`p-2 ${isOpen ? '' : 'w-10 h-10 flex items-center justify-center'}`}>
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

const DancerRegistrationForm = ({ onRegister, initialData, onUpdate }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [number, setNumber] = useState(initialData?.number || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [age, setAge] = useState(initialData?.age || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onUpdate({ ...initialData, name, number, category, age });
    } else {
      onRegister({ name, number, category, age });
    }
    setName('');
    setNumber('');
    setCategory('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
      <Select value={category} onValueChange={setCategory} required>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="primary">Primary</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="novice">Novice</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="premier">Premier</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      <Button type="submit">{initialData ? 'Update Dancer' : 'Register Dancer'}</Button>
    </form>
  );
};

const DancerManagement = ({ dancers, onRegister, onUpdate, onDelete }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dancer Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2" />Add Dancer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Dancer</DialogTitle>
            </DialogHeader>
            <DancerRegistrationForm onRegister={onRegister} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dancers.map((dancer) => (
            <TableRow key={dancer.number}>
              <TableCell>{dancer.number}</TableCell>
              <TableCell>{dancer.name}</TableCell>
              <TableCell className="capitalize">{dancer.category}</TableCell>
              <TableCell>{dancer.age}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm"><Pencil size={16} /></Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Dancer</DialogTitle>
                    </DialogHeader>
                    <DancerRegistrationForm initialData={dancer} onUpdate={onUpdate} />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm"><Trash2 size={16} /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the dancer's data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(dancer.number)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const AgeGroupEditor = ({ ageGroup, onChange, onDelete }) => {
  const [minAge, setMinAge] = useState(ageGroup.minAge || '');
  const [maxAge, setMaxAge] = useState(ageGroup.maxAge || '');

  useEffect(() => {
    const newName = generateAgeGroupName(minAge, maxAge);
    onChange({ ...ageGroup, minAge, maxAge, name: newName });
  }, [minAge, maxAge]);

  const generateAgeGroupName = (min, max) => {
    if (!min && !max) return 'All Ages';
    if (!min) return `${max} & Under`;
    if (!max) return `${min} & Over`;
    return `${min} & Under ${max}`;
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Input
        type="number"
        placeholder="Min Age"
        value={minAge}
        onChange={(e) => setMinAge(e.target.value)}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="Max Age"
        value={maxAge}
        onChange={(e) => setMaxAge(e.target.value)}
        className="w-24"
      />
      <span className="flex-grow">{ageGroup.name}</span>
      <Button variant="outline" size="sm" onClick={onDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

const DanceSelector = ({ category, selectedDances, onChange }) => {
  const allDances = {
    primary: ['16 Pas de Basques', 'Pas de Basques and Highcuts', 'Highland Fling (4 steps)', 'Sword Dance (2 slow, 1 quick)'],
    beginnerNovice: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Special Fling or Trophy Fling'],
    intermediate: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Barracks Johnnie', 'Highland Laddie', 'Sailor\'s Hornpipe', 'Irish Jig'],
    premier: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Sailor\'s Hornpipe', 'Irish Jig', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Wilt Thou Go to the Barracks Johnnie', 'Highland Laddie', 'Blue Bonnets', 'Village Maid', 'Earl of Errol', 'Scotch Measure'],
    championship: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Strathspey and Highland Reel', 'Strathspey and Half Tulloch', 'Strathspey and Highland Reel and Half Tulloch'],
    premiership: ['Irish Jig', 'Sailor\'s Hornpipe', 'Flora MacDonald\'s Fancy', 'Scottish Lilt', 'Blue Bonnets', 'Village Maid', 'Earl of Errol', 'Scotch Measure']
  };

  const dances = allDances[category] || allDances.premier;

  return (
    <div className="space-y-2">
      {dances.map((dance) => (
        <label key={dance} className="flex items-center space-x-2">
          <Checkbox
            checked={selectedDances.includes(dance)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...selectedDances, dance]);
              } else {
                onChange(selectedDances.filter((d) => d !== dance));
              }
            }}
          />
          <span>{dance}</span>
        </label>
      ))}
    </div>
  );
};

const CompetitionSetup = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [ageGroups, setAgeGroups] = useState({
    primary: [{ name: 'All Ages' }],
    beginner: [{ name: '10 & Under', minAge: '', maxAge: '10' }, { name: '11 & Over', minAge: '11', maxAge: '' }],
    novice: [{ name: 'All Ages' }],
    intermediate: [{ name: 'All Ages' }],
    premier: [
      { name: '7 & Under 12', minAge: '7', maxAge: '11' },
      { name: '12 & Under 16', minAge: '12', maxAge: '15' },
      { name: '16 & Over', minAge: '16', maxAge: '' }
    ],
  });

  const [dances, setDances] = useState({
    primary: ['16 Pas de Basques', 'Pas de Basques and Highcuts', 'Highland Fling (4 steps)', 'Sword Dance (2 slow, 1 quick)'],
    beginner: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel'],
    novice: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel'],
    intermediate: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Flora MacDonald\'s Fancy', 'Scottish Lilt'],
    premier: ['Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Reel', 'Sailor\'s Hornpipe', 'Irish Jig'],
  });

  const [championshipAgeGroups, setChampionshipAgeGroups] = useState([
    { name: '7 & Under 12', minAge: '7', maxAge: '11' },
    { name: '12 & Under 16', minAge: '12', maxAge: '15' },
    { name: '16 & Over', minAge: '16', maxAge: '' }
  ]);
  const [championshipDances, setChampionshipDances] = useState([
    'Highland Fling', 'Sword Dance', 'Seann Triubhas', 'Strathspey and Highland Reel'
  ]);
  const [premiership, setPremiership] = useState({
    ageGroups: [
      { name: 'Juvenile (7 Years – Under 12 Years)', minAge: '7', maxAge: '11' },
      { name: 'Junior (12 & Under 16 Years)', minAge: '12', maxAge: '15' },
      { name: 'Senior (16 Years & Over)', minAge: '16', maxAge: '' }
    ],
    dances: ['Irish Jig', 'Sailors Hornpipe', 'Scottish Lilt', 'Flora MacDonald\'s Fancy']
  });

  const [hasChampionship, setHasChampionship] = useState(false);
  const [hasPremiership, setHasPremiership] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddAgeGroup = (category) => {
    setAgeGroups(prev => ({
      ...prev,
      [category]: [...prev[category], { name: 'New Age Group', minAge: '', maxAge: '' }]
    }));
  };

  const handleUpdateAgeGroup = (category, index, updatedAgeGroup) => {
    setAgeGroups(prev => ({
      ...prev,
      [category]: prev[category].map((group, i) => i === index ? updatedAgeGroup : group)
    }));
  };

  const handleDeleteAgeGroup = (category, index) => {
    setAgeGroups(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleAddChampionshipAgeGroup = () => {
    setChampionshipAgeGroups(prev => [...prev, { name: 'New Age Group', minAge: '', maxAge: '' }]);
  };

  const handleUpdateChampionshipAgeGroup = (index, updatedAgeGroup) => {
    setChampionshipAgeGroups(prev => prev.map((group, i) => i === index ? updatedAgeGroup : group));
  };

  const handleDeleteChampionshipAgeGroup = (index) => {
    setChampionshipAgeGroups(prev => prev.filter((_, i) => i !== index));
  };

  const handleDanceChange = (category, newDances) => {
    setDances(prev => ({
      ...prev,
      [category]: newDances
    }));
  };

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
                  <div>
                    {groups.map((group, index) => (
                      <AgeGroupEditor
                        key={index}
                        ageGroup={group}
                        onChange={(updatedGroup) => handleUpdateAgeGroup(category, index, updatedGroup)}
                        onDelete={() => handleDeleteAgeGroup(category, index)}
                      />
                    ))}
                    <Button variant="outline" size="sm" onClick={() => handleAddAgeGroup(category)}>
                      <PlusCircle size={16} className="mr-1" /> Add Age Group
                    </Button>
                  </div>
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
          <input
            type="checkbox"
            checked={hasChampionship}
            onChange={(e) => setHasChampionship(e.target.checked)}
            className="mr-2"
          />
          Include Championship
        </label>
        {hasChampionship && (
          <div>
            <h4 className="text-md font-semibold mb-2">Championship Age Groups</h4>
            {isEditing ? (
              <div>
                {championshipAgeGroups.map((group, index) => (
                  <AgeGroupEditor
                    key={index}
                    ageGroup={group}
                    onChange={(updatedGroup) => handleUpdateChampionshipAgeGroup(index, updatedGroup)}
                    onDelete={() => handleDeleteChampionshipAgeGroup(index)}
                  />
                ))}
                <Button variant="outline" size="sm" onClick={handleAddChampionshipAgeGroup}>
                  <PlusCircle size={16} className="mr-1" /> Add Championship Age Group
                </Button>
              </div>
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
          <input
            type="checkbox"
            checked={hasPremiership}
            onChange={(e) => setHasPremiership(e.target.checked)}
            className="mr-2"
          />
          Include Premiership
        </label>
        {hasPremiership && (
          <div>
            <h4 className="text-md font-semibold mb-2">Premiership Age Groups</h4>
            {isEditing ? (
              <div>
                {premiership.ageGroups.map((group, index) => (
                  <AgeGroupEditor
                    key={index}
                    ageGroup={group}
                    onChange={(updatedGroup) => {
                      const newAgeGroups = [...premiership.ageGroups];
                      newAgeGroups[index] = updatedGroup;
                      setPremiership({ ...premiership, ageGroups: newAgeGroups });
                    }}
                    onDelete={() => {
                      const newAgeGroups = premiership.ageGroups.filter((_, i) => i !== index);
                      setPremiership({ ...premiership, ageGroups: newAgeGroups });
                    }}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPremiership({
                    ...premiership,
                    ageGroups: [...premiership.ageGroups, { name: 'New Age Group', minAge: '', maxAge: '' }]
                  })}
                >
                  <PlusCircle size={16} className="mr-1" /> Add Premiership Age Group
                </Button>
              </div>
            ) : (
              <p>{premiership.ageGroups.map(group => group.name).join(', ')}</p>
            )}
            <h4 className="text-md font-semibold mt-4 mb-2">Premiership Dances</h4>
            {isEditing ? (
              <DanceSelector
                category="premiership"
                selectedDances={premiership.dances}
                onChange={(newDances) => setPremiership({ ...premiership, dances: newDances })}
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

const MainContent = ({ activeView, dancers, onRegister, onUpdate, onDelete }) => {
  const viewComponents = {
    dancers: <DancerManagement dancers={dancers} onRegister={onRegister} onUpdate={onUpdate} onDelete={onDelete} />,
    setup: <CompetitionSetup />,
    results: <h2 className="text-xl font-semibold">Results Calculation</h2>,
    awards: <h2 className="text-xl font-semibold">Award Management</h2>,
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Highland Dance Scrutineering</h1>
      {viewComponents[activeView]}
    </div>
  );
};

const ScrutineeringApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dancers');
  const [dancers, setDancers] = useState([]);
  const [nextNumber, setNextNumber] = useState(100);

  const handleRegister = (dancer) => {
    const newNumber = dancer.number || nextNumber.toString();
    if (dancers.some(d => d.number === newNumber)) {
      alert('This number is already taken. Please choose a different one.');
      return;
    }
    setDancers([...dancers, { ...dancer, number: newNumber }]);
    setNextNumber(prev => Math.max(prev, parseInt(newNumber) + 1));
  };

  const handleUpdate = (updatedDancer) => {
    setDancers(dancers.map(d => d.number === updatedDancer.number ? updatedDancer : d));
  };

  const handleDelete = (number) => {
    setDancers(dancers.filter(d => d.number !== number));
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <MainContent 
        activeView={activeView} 
        dancers={dancers} 
        onRegister={handleRegister}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ScrutineeringApp;