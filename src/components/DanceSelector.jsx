// /src/components/DanceSelector.jsx
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ALL_DANCES } from '../utils/constants';

/**
 * A component that renders a selector for dances.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.category - The category of dances to display.
 * @param {string[]} props.selectedDances - The array of selected dances.
 * @param {Function} props.onChange - The function to call when the selection changes.
 * @returns {JSX.Element} The rendered DanceSelector component.
 */
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