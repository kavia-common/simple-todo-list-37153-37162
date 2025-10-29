Checkpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aCheckpoint 1 - cg2454fd0aimport { render, screen } from '@testing-library/react';
import App from './App';

test('renders retro header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { name: /Retro Todo Console/i });
  expect(header).toBeInTheDocument();
});

test('has input and add button', () => {
  render(<App />);
  const input = screen.getByLabelText(/Todo text/i);
  const button = screen.getByRole('button', { name: /Add/i });
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
