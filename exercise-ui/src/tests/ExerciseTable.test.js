import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ExerciseTable from '../components/ExerciseTable';

describe('Exercise Table', () => {

  // Mock Exercise Component (formatted as individual row in table)
  jest.mock('../components/Exercise', () => ({ exercise, onDelete, onEdit }) => (
    <tr>
        <td>{exercise.name}</td>
        <td>{exercise.reps}</td>
        <td>{exercise.weight}</td>
        <td>{exercise.unit}</td>
        <td>{exercise.date}</td>
        <td><button name="edit-button" onClick={() => onEdit(exercise)}>Edit</button></td>
        <td><button onClick={() => onDelete(exercise)}>Delete</button></td>
    </tr>
  ));

  // Mock Exercises
  const mockExercises = [
    {name: 'Bench Press', reps: 10, weight: 100, unit: 'lbs', date: '2022-05-01'},    
    {name: 'Row', reps: 5, weight: 25, unit: 'kg', date: '2022-05-02'}
  ]

  // Mock Edit and Delete functions
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnEdit.mockClear();
  });

  // TESTS //
  test('renders exercise table with headers', () => {
    render(<ExerciseTable exercises={mockExercises} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Reps')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Unit')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('renders correct number of exercises (2 from mock)', () => {
    render(<ExerciseTable exercises={mockExercises} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getAllByText(/Bench Press|Row/)).toHaveLength(mockExercises.length);
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<ExerciseTable exercises={mockExercises} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    
    // Click the edit button of the first exercise
    const editButtons = screen.getAllByRole('button', {name: "edit"});
    userEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockExercises[0]);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<ExerciseTable exercises={mockExercises} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
    
    // Click the delete button of the first exercise
    const deleteButtons = screen.getAllByRole('button', {name: "delete"});
    userEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

});
