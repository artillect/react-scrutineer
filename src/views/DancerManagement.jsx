import React, { useState, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DancerRegistrationForm from '../components/DancerRegistrationForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DancerTable from '../components/DancerTable';
import { PlusCircle, Pencil, PencilOff, Save } from 'lucide-react';

const DancerManagement = () => {
  const { dancers, setDancers, competitions } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [error, setError] = useState(null);
  const [isBatchEditing, setIsBatchEditing] = useState(false);
  const [batchEditedDancers, setBatchEditedDancers] = useState([]);

  const filteredDancers = useMemo(() => {
    return dancers.filter(dancer => 
      dancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dancer.number.includes(searchTerm)
    );
  }, [dancers, searchTerm]);

  const sortedDancers = useMemo(() => {
    let sortableDancers = [...filteredDancers];
    if (sortConfig.key !== null) {
      sortableDancers.sort((a, b) => {
        if (sortConfig.key === 'number' || sortConfig.key === 'age') {
          return sortConfig.direction === 'ascending'
            ? a[sortConfig.key] - b[sortConfig.key]
            : b[sortConfig.key] - a[sortConfig.key];
        } else {
          const comparison = a[sortConfig.key].localeCompare(b[sortConfig.key]);
          return sortConfig.direction === 'ascending' ? comparison : -comparison;
        }
      });
    }
    return sortableDancers;
  }, [filteredDancers, sortConfig]);

  const handleAddDancer = (newDancer) => {
    try {
      setDancers(prevDancers => [...prevDancers, { ...newDancer, id: Date.now() }]);
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to add dancer. Please try again.");
    }
  };

  const handleUpdateDancer = (updatedDancer) => {
    try {
      setDancers(prevDancers => prevDancers.map(dancer => 
        dancer.id === updatedDancer.id ? updatedDancer : dancer
      ));
    } catch (err) {
      setError("Failed to update dancer. Please try again.");
    }
  };

  const handleDeleteDancer = (dancerId) => {
    try {
      setDancers(prevDancers => prevDancers.filter(dancer => dancer.id !== dancerId));
    } catch (err) {
      setError("Failed to delete dancer. Please try again.");
    }
  };

  const handleCompetitionToggle = (dancerId, competitionId) => {
    try {
      setDancers(prevDancers => prevDancers.map(dancer => {
        if (dancer.id === dancerId) {
          const updatedCompetitions = dancer.competitions
            ? dancer.competitions.includes(competitionId)
              ? dancer.competitions.filter(id => id !== competitionId)
              : [...dancer.competitions, competitionId]
            : [competitionId];
          return { ...dancer, competitions: updatedCompetitions };
        }
        return dancer;
      }));
    } catch (err) {
      setError("Failed to update dancer's competitions. Please try again.");
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleBatchEdit = () => {
    setIsBatchEditing(true);
    setBatchEditedDancers(sortedDancers);
  };

  const handleBatchSave = () => {
    try {
      setDancers(batchEditedDancers);
      setIsBatchEditing(false);
    } catch (err) {
      setError("Failed to save batch edits. Please try again.");
    }
  };

  const handleBatchCancel = () => {
    setIsBatchEditing(false);
    setBatchEditedDancers([]);
  };

  const handleBatchUpdate = (updatedDancer) => {
    setBatchEditedDancers(prevDancers => 
      prevDancers.map(dancer => 
        dancer.id === updatedDancer.id ? updatedDancer : dancer
      )
    );
  };

  const handleBatchCompetitionToggle = (dancerId, competitionId) => {
    setBatchEditedDancers(prevDancers => 
      prevDancers.map(dancer => {
        if (dancer.id === dancerId) {
          const updatedCompetitions = dancer.competitions
            ? dancer.competitions.includes(competitionId)
              ? dancer.competitions.filter(id => id !== competitionId)
              : [...dancer.competitions, competitionId]
            : [competitionId];
          return { ...dancer, competitions: updatedCompetitions };
        }
        return dancer;
      })
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white z-10 pb-4">
        <h2 className="text-xl font-semibold mb-4">Dancer Management</h2>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search dancers by name/number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <div>
            {isBatchEditing ? (
              <>
                <Button onClick={handleBatchSave} className="mr-2">
                  <Save className="mr-2 h-4 w-4" /> Save All
                </Button>
                <Button onClick={handleBatchCancel} variant="outline">
                  <PencilOff className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleBatchEdit} className="mr-2">
                  <Pencil className="mr-2 h-4 w-4" /> Edit All
                </Button>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Dancer
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Dancer</DialogTitle>
                    </DialogHeader>
                    <DancerRegistrationForm onRegister={handleAddDancer} />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <DancerTable
          dancers={isBatchEditing ? batchEditedDancers : sortedDancers}
          competitions={competitions}
          onUpdateDancer={isBatchEditing ? handleBatchUpdate : handleUpdateDancer}
          onDeleteDancer={handleDeleteDancer}
          onToggleCompetition={isBatchEditing ? handleBatchCompetitionToggle : handleCompetitionToggle}
          onSort={handleSort}
          sortConfig={sortConfig}
          isEditable={isBatchEditing}
          showEditButtons={true}
        />
      </div>
    </div>
  );
};

export default DancerManagement;
