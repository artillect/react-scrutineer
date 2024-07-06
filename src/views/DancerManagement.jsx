import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DancerRegistrationForm from '../components/DancerRegistrationForm';

const DancerManagement = () => {
  const { dancers, setDancers } = useAppContext();

  const handleRegister = (newDancer) => {
    setDancers([...dancers, { ...newDancer, id: Date.now().toString() }]);
  };

  const handleUpdate = (updatedDancer) => {
    setDancers(dancers.map(d => d.id === updatedDancer.id ? updatedDancer : d));
  };

  const handleDelete = (dancerId) => {
    setDancers(dancers.filter(d => d.id !== dancerId));
  };

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
            <DancerRegistrationForm onRegister={handleRegister} />
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
            <TableRow key={dancer.id}>
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
                    <DancerRegistrationForm initialData={dancer} onUpdate={handleUpdate} />
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
                      <AlertDialogAction onClick={() => handleDelete(dancer.id)}>Delete</AlertDialogAction>
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

export default DancerManagement;