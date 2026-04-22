import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PujaPath user website', () => {
  render(<App />);

  expect(screen.getAllByText(/PujaPath/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('button', { name: /Book Puja/i })).toBeInTheDocument();
});
