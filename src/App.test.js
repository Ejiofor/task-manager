

import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders Home page heading', async () => {
  axios.get.mockResolvedValueOnce({ data: [
    { id: 1, title: 'Test Task', description: 'Test Desc', status: 'Pending' }
  ] });
  render(<App />);
  await waitFor(() => expect(screen.getByText(/Task Manager/i)).toBeInTheDocument());
  // Optionally, check that the task is rendered
  expect(screen.getByText('Test Task')).toBeInTheDocument();
  expect(screen.getByText('Test Desc')).toBeInTheDocument();
});
