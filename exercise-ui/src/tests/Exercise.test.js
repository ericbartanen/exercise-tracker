import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Exercise from '../components/Exercise';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

describe('Exercise Component', () => {

  // Mock Exercise Component
  const mockExercise = {
    name: 'Squat',
    reps: 10,
    weight: 100,
    unit: 'lbs',
    date: '2024-07-16',
    _id: '1'
  };

  // Mock Edit and Delete Functions
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  // TESTS //
  test('renders exercise details', () => {
    render(<Exercise exercise={mockExercise} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('Squat')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('lbs')).toBeInTheDocument();
    expect(screen.getByText('2024-07-16')).toBeInTheDocument();
  });

  test('calls onEdit with exercise object when edit button is clicked', () => {
    render(<Exercise exercise={mockExercise} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockExercise);
  });

  test('calls onDelete with exercise id when delete button is clicked', () => {
    render(<Exercise exercise={mockExercise} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockExercise._id);
  });
});
