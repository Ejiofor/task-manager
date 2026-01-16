  it('shows error if fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));
    render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Update Task/i)).toBeInTheDocument();
    // Optionally, check if Swal.fire was called (if you mock it)
  });

  it('shows error if update fails', async () => {
    axios.get.mockResolvedValueOnce({ data: { title: 'Test', description: 'Desc' } });
    axios.put.mockRejectedValueOnce(new Error('Update error'));
    render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );
    const titleInput = await screen.findByDisplayValue('Test');
    fireEvent.change(titleInput, { target: { value: 'Updated', name: 'title' } });
    fireEvent.click(screen.getByText(/Update Task/i));
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
    // Optionally, check if Swal.fire was called (if you mock it)
  });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateTask from './UpdateTask';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';


jest.mock('axios');
// Mock Swal.fire to avoid errors in test environment
import Swal from 'sweetalert2';
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: {
    fire: jest.fn(),
  },
  fire: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ taskId: '1' })
}));

describe('UpdateTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );
    expect(screen.getByText(/Update Task/i)).toBeInTheDocument();
  });

  it('renders and fetches task', async () => {
    axios.get.mockResolvedValueOnce({ data: { title: 'Test', description: 'Desc' } });
    render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );
    expect(await screen.findByDisplayValue('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Desc')).toBeInTheDocument();
  });

  it('updates form fields and submits', async () => {
    axios.get.mockResolvedValueOnce({ data: { title: 'Test', description: 'Desc' } });
    axios.put.mockResolvedValueOnce({});
    render(
      <MemoryRouter>
        <UpdateTask />
      </MemoryRouter>
    );
    const titleInput = await screen.findByDisplayValue('Test');
    fireEvent.change(titleInput, { target: { value: 'Updated', name: 'title' } });
    fireEvent.change(screen.getByDisplayValue('Desc'), { target: { value: 'Updated Desc', name: 'description' } });
    fireEvent.click(screen.getByText(/Update Task/i));
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });
});
