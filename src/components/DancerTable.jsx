import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, ChevronDown } from 'lucide-react';
import EditableDancerRow from './EditableDancerRow';

/**
 * Renders a table of dancers with sortable columns and optional edit buttons.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.dancers - The array of dancers to display in the table.
 * @param {Array} [props.competitions=[]] - The array of competitions to display as columns.
 * @param {Function} props.onToggleCompetition - The function to toggle a dancer's participation in a competition.
 * @param {Function} props.onSort - The function to handle column sorting.
 * @param {Object} props.sortConfig - The current sort configuration.
 * @param {Array} [props.columns=['number', 'name', 'category', 'age']] - The columns to display in the table.
 * @param {boolean} [props.isEditable=false] - Indicates whether the table is editable.
 * @param {Function} props.onUpdateDancer - The function to update a dancer's information.
 * @param {Function} props.onDeleteDancer - The function to delete a dancer.
 * @param {boolean} props.showEditButtons - Indicates whether to show edit buttons in the table.
 * @returns {JSX.Element} The rendered DancerTable component.
 */
const DancerTable = ({ 
  dancers, 
  competitions = [], 
  onToggleCompetition, 
  onSort, 
  sortConfig, 
  columns = ['number', 'name', 'category', 'age'],
  isEditable = false,
  onUpdateDancer,
  onDeleteDancer,
  showEditButtons
}) => {
  const renderSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ChevronUp className="inline-block ml-1" /> : <ChevronDown className="inline-block ml-1" />;
    }
    return null;
  };

  const columnWidths = {
    number: 'w-24',
    name: 'w-48',
    category: 'w-36',
    age: 'w-24'
  };

  return (
    <div className="overflow-auto h-full">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            {columns.map(column => (
              <TableHead 
                key={column} 
                className={`cursor-pointer ${columnWidths[column]}`} 
                onClick={() => onSort(column)}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)} {renderSortIndicator(column)}
              </TableHead>
            ))}
            {competitions.map(comp => (
              <TableHead key={comp.id} className="w-32">{comp.name}</TableHead>
            ))}
            {showEditButtons && <TableHead className="w-48">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dancers.map(dancer => (
            <EditableDancerRow
              key={dancer.id}
              dancer={dancer}
              columns={columns}
              competitions={competitions}
              onToggleCompetition={onToggleCompetition}
              onUpdateDancer={onUpdateDancer}
              onDeleteDancer={onDeleteDancer}
              isEditable={isEditable}
              showEditButtons={showEditButtons} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(DancerTable);