// /src/components/AgeGroupEditor.jsx
import React, { useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

/**
 * Renders an editor for an age group.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.ageGroup - The age group object.
 * @param {Function} props.onChange - The function to handle changes in the age group.
 * @param {Function} props.onDelete - The function to handle deletion of the age group.
 * @returns {JSX.Element} The AgeGroupEditor component.
 */
const AgeGroupEditor = ({ ageGroup, onChange, onDelete }) => {
  const handleChange = useCallback((field, value) => {
    onChange({ ...ageGroup, [field]: value });
  }, [ageGroup, onChange]);

  const generateAgeGroupName = useCallback((min, max) => {
    if ((min === '' || min === 0) && max === '') return 'All Ages';
    if (min === '' || min === 0) return `${max} & Under`;
    if (max === '') return `${min} & Over`;
    return `${min} & Under ${max}`;
  }, []);

  useEffect(() => {
    const newName = generateAgeGroupName(ageGroup.minAge, ageGroup.maxAge);
    if (newName !== ageGroup.name) {
      onChange({ ...ageGroup, name: newName });
    }
  }, [ageGroup, onChange, generateAgeGroupName]);

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Input
        type="number"
        placeholder="Min Age"
        value={ageGroup.minAge}
        onChange={(e) => handleChange('minAge', e.target.value)}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="Max Age"
        value={ageGroup.maxAge}
        onChange={(e) => handleChange('maxAge', e.target.value)}
        className="w-24"
      />
      <span className="flex-grow">{ageGroup.name}</span>
      <Button variant="outline" size="sm" onClick={onDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
};

export default AgeGroupEditor;