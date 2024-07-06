import React, { useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const AgeGroupEditor = ({ ageGroup, onChange, onDelete }) => {
  const handleChange = useCallback((field, value) => {
    onChange({ ...ageGroup, [field]: value });
  }, [ageGroup, onChange]);

  const generateAgeGroupName = useCallback((min, max) => {
    if (!min && !max) return 'All Ages';
    if (!min) return `${max} & Under`;
    if (!max) return `${min} & Over`;
    return `${min} & Under ${max}`;
  }, []);

  useEffect(() => {
    const newName = generateAgeGroupName(ageGroup.minAge, ageGroup.maxAge);
    if (newName !== ageGroup.name) {
      onChange({ ...ageGroup, name: newName });
    }
  }, [ageGroup.minAge, ageGroup.maxAge, ageGroup.name, onChange, generateAgeGroupName]);

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