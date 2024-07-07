// /src/components/DancerRegistrationForm.jsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '../contexts/AppContext';

/**
 * A form component for registering a dancer.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onRegister - The function to call when registering a dancer.
 * @param {Object} props.initialData - The initial data for the form fields.
 * @param {Function} props.onUpdate - The function to call when updating a dancer's information.
 * @returns {JSX.Element} The DancerRegistrationForm component.
 */
const DancerRegistrationForm = ({ onRegister, initialData, onUpdate }) => {
  const { competitions } = useAppContext();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    number: '',
    category: '',
    age: '',
    competitions: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompetitionToggle = (competitionId) => {
    setFormData(prev => ({
      ...prev,
      competitions: prev.competitions.includes(competitionId)
        ? prev.competitions.filter(id => id !== competitionId)
        : [...prev.competitions, competitionId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onUpdate(formData);
    } else {
      onRegister(formData);
    }
    if (!initialData) setFormData({ name: '', number: '', category: '', age: '', competitions: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />
      <Input
        placeholder="Number"
        value={formData.number}
        onChange={(e) => handleChange('number', e.target.value)}
        required
      />
      <Select value={formData.category} onValueChange={(value) => handleChange('category', value)} required>
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
      <Input
        placeholder="Age"
        type="number"
        value={formData.age}
        onChange={(e) => handleChange('age', e.target.value)}
        required
      />
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Competitions</h3>
        {competitions.map(comp => (
          <label key={comp.id} className="flex items-center space-x-2">
            <Checkbox
              checked={formData.competitions.includes(comp.id)}
              onCheckedChange={() => handleCompetitionToggle(comp.id)}
            />
            <span>{comp.name}</span>
          </label>
        ))}
      </div>
      <Button type="submit">{initialData ? 'Update Dancer' : 'Register Dancer'}</Button>
    </form>
  );
};

export default DancerRegistrationForm;