
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component and loads tasks', async () => {
    axios.get.mockResolvedValueOnce({ data: [
      { id: 1, title: 'Test Task', description: 'Test Desc', status: 'Pending' }
    ] });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // Wait for the heading to appear after tasks load
    await waitFor(() => expect(screen.getByText(/Task Manager/i)).toBeInTheDocument());
    // Optionally, check that the task is rendered
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Desc')).toBeInTheDocument();
  });

  // Add more tests as needed for task listing, interactions, etc.
});
