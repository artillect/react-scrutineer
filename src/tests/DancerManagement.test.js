import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DancerManagement from '../views/DancerManagement';
import { useAppContext } from '../contexts/AppContext';

// Mock the AppContext
jest.mock('../contexts/AppContext', () => ({
  useAppContext: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('DancerManagement', () => {
  const mockDancers = [
    { id: 1, number: '101', name: 'Alice', category: 'beginner', age: '10', competitions: [1] },
    { id: 2, number: '102', name: 'Bob', category: 'novice', age: '12', competitions: [2] },
  ];

  const mockCompetitions = [
    { id: 1, name: 'Competition A' },
    { id: 2, name: 'Competition B' },
  ];

  const mockCategories = ['primary', 'beginner', 'novice', 'intermediate', 'premier'];

  beforeEach(() => {
    useAppContext.mockReturnValue({
      dancers: mockDancers,
      setDancers: jest.fn(),
      competitions: mockCompetitions,
      categories: mockCategories,
    });
  });

  it('renders the component title', () => {
    render(<DancerManagement />);
    expect(screen.getByText('Dancer Management')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<DancerManagement />);
    expect(screen.getByPlaceholderText('Search dancers by name/number...')).toBeInTheDocument();
  });

  it('renders the "Add Dancer" button', () => {
    render(<DancerManagement />);
    expect(screen.getByText('Add Dancer')).toBeInTheDocument();
  });

  it('renders the dancer table with correct headers', () => {
    render(<DancerManagement />);
    expect(screen.getByText('Number')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    mockCompetitions.forEach(comp => {
      expect(screen.getByText(comp.name)).toBeInTheDocument();
    });
  });

  it('renders the correct number of dancers', () => {
    render(<DancerManagement />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockDancers.length + 1); // +1 for header row
  });

  it('filters dancers when searching', () => {
    render(<DancerManagement />);
    const searchInput = screen.getByPlaceholderText('Search dancers by name/number...');
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('opens the "Add Dancer" modal when clicking the button', async () => {
    render(<DancerManagement />);
    fireEvent.click(screen.getByText('Add Dancer'));
    await waitFor(() => {
      expect(screen.getByText('Add New Dancer')).toBeInTheDocument();
    });
  });

  it('enters batch edit mode when "Edit All" is clicked', () => {
    render(<DancerManagement />);
    fireEvent.click(screen.getByText('Edit All'));
    expect(screen.getByText('Save All')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('exits batch edit mode when "Cancel" is clicked', () => {
    render(<DancerManagement />);
    fireEvent.click(screen.getByText('Edit All'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Edit All')).toBeInTheDocument();
    expect(screen.queryByText('Save All')).not.toBeInTheDocument();
  });

  it('allows editing individual dancers', () => {
    render(<DancerManagement />);
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
  });

  it('allows deleting dancers', async () => {
    const setDancersMock = jest.fn();
    useAppContext.mockReturnValue({
      ...useAppContext.mockReturnValue(),
      setDancers: setDancersMock,
    });

    render(<DancerManagement />);
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete Alice?')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    expect(setDancersMock).toHaveBeenCalledWith(
      expect.arrayContaining([expect.not.objectContaining({ id: 1 })])
    );
  });
});