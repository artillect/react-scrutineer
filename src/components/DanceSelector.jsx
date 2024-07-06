import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ALL_DANCES } from '../utils/constants';

const DanceSelector = ({ category, selectedDances, onChange }) => {
  const dances = ALL_DANCES[category] || ALL_DANCES.premier;

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

export default DanceSelector;