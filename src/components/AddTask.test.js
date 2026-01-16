import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTask from './AddTask';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

describe('AddTask component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddTask component with form fields', () => {
    render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );
    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
  });

  test('allows input in title and description', () => {
    render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );
    const titleInput = screen.getByLabelText(/Task Title/i);
    const descInput = screen.getByLabelText(/Description/i);
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descInput, { target: { value: 'Test Description' } });
    expect(titleInput.value).toBe('Test Title');
    expect(descInput.value).toBe('Test Description');
  });

  test('shows error if API fails', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Failed to add task' } } });
    render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Task Title/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
    expect(await screen.findByText(/Failed to add task/i)).toBeInTheDocument();
  });

  test('submits form and resets fields on success', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <AddTask />
      </MemoryRouter>
    );
    const titleInput = screen.getByLabelText(/Task Title/i);
    const descInput = screen.getByLabelText(/Description/i);
    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.change(descInput, { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    // Wait for the input values to reset
    await waitFor(() => expect(titleInput.value).toBe(''));
    await waitFor(() => expect(descInput.value).toBe(''));
    expect(window.alert).toHaveBeenCalledWith('Task added successfully!');
  });
});
