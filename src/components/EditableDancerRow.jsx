import React, { useState, useEffect, useCallback } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Save, PencilOff } from 'lucide-react';

const EditableDancerRow = ({
    dancer,
    columns,
    competitions,
    onToggleCompetition,
    onUpdateDancer,
    onDeleteDancer,
    isEditable,
    showEditButtons = true
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDancer, setEditedDancer] = useState(dancer);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setIsEditing(isEditable);
    }, [isEditable]);

    useEffect(() => {
        setEditedDancer(dancer);
    }, [dancer]);

    const handleEdit = useCallback(() => setIsEditing(true), []);
    const handleCancelEdit = useCallback(() => {
        setEditedDancer(dancer);
        setIsEditing(false);
    }, [dancer]);
    const handleSaveEdit = useCallback(() => {
        onUpdateDancer(editedDancer);
        if (!isEditable) {
            setIsEditing(false);
        }
    }, [editedDancer, isEditable, onUpdateDancer]);
    const handleDelete = useCallback(() => setIsDeleting(true), []);
    const confirmDelete = useCallback(() => {
        onDeleteDancer(dancer.id);
        setIsDeleting(false);
    }, [dancer.id, onDeleteDancer]);

    const handleInputChange = useCallback((field, value) => {
        setEditedDancer(prev => ({ ...prev, [field]: value }));
        if (isEditable) {
            onUpdateDancer({ ...editedDancer, [field]: value });
        }
    }, [editedDancer, isEditable, onUpdateDancer]);

    const SelectInput = ({ value, onValueChange }) => (
        <Select
            value={value}
            onValueChange={onValueChange}
        >
            <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                {['primary', 'beginner', 'novice', 'intermediate', 'premier'].map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );

    const TextInput = ({ type, value, onChange }) => (
        <Input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full h-8"
        />
    );

    const EditButtons = () => (
        <>
            <Button onClick={handleSaveEdit} size="sm" className="mr-2 px-0">
                <Save className="h-4 w-4 m-2" />
            </Button>
            <Button onClick={handleCancelEdit} size="sm" variant="outline" className="px-0">
                <PencilOff className="h-4 w-4 m-2" />
            </Button>
        </>
    );

    const ViewButtons = () => (
        <>
            <Button onClick={handleEdit} size="sm" variant="outline" className="mr-2 px-0">
                <Pencil className="h-4 w-4 m-2" />
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} className="px-0">
                <Trash2 className="h-4 w-4 m-2" />
            </Button>
        </>
    );

    const ConfirmationDialog = () => (
        <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete {dancer.name}?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleting(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    const columnWidths = {
        number: 'w-24',
        name: 'w-48',
        category: 'w-36',
        age: 'w-24'
    };

    return (
        <TableRow>
            {columns.map(column => (
                <TableCell key={column} className={columnWidths[column]}>
                    {isEditing ? (
                        column === 'category' ? (
                            <SelectInput
                                value={editedDancer[column]}
                                onValueChange={(value) => handleInputChange(column, value)}
                            />
                        ) : (
                            <TextInput
                                type={column === 'age' ? 'number' : 'text'}
                                value={editedDancer[column]}
                                onChange={(e) => handleInputChange(column, e.target.value)}
                            />
                        )
                    ) : editedDancer[column]}
                </TableCell>
            ))}
            {competitions.map(comp => (
                <TableCell key={comp.id} className="w-32">
                    <Checkbox
                        className="m-2"
                        checked={editedDancer.competitions?.includes(comp.id) || false}
                        onCheckedChange={() => {
                            const updatedDancer = {
                                ...editedDancer,
                                competitions: editedDancer.competitions?.includes(comp.id)
                                    ? editedDancer.competitions.filter(id => id !== comp.id)
                                    : [...(editedDancer.competitions || []), comp.id]
                            };
                            setEditedDancer(updatedDancer);
                            onToggleCompetition(updatedDancer.id, comp.id);
                        }}
                        disabled={!isEditing}
                    />
                </TableCell>
            ))}
            {showEditButtons && !isEditable && (
                <TableCell className="w-48">
                    {isEditing ? <EditButtons /> : <ViewButtons />}
                </TableCell>
            )}
            <ConfirmationDialog />
        </TableRow>
    );
};

export default React.memo(EditableDancerRow);