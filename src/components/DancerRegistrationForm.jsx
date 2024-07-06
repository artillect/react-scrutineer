import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DancerRegistrationForm = ({ onRegister, initialData, onUpdate }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    number: '',
    category: '',
    age: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onUpdate(formData);
    } else {
      onRegister(formData);
    }
    if (!initialData) setFormData({ name: '', number: '', category: '', age: '' });
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
      <Button type="submit">{initialData ? 'Update Dancer' : 'Register Dancer'}</Button>
    </form>
  );
};

export default DancerRegistrationForm;