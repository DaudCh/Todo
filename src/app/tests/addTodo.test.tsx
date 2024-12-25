import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('calls onSubmit with the correct input', () => {
    const onSubmit = jest.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('New Task');
    fireEvent.change(input, { target: { value: 'Test Task' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledWith('Test Task');
  });
});
