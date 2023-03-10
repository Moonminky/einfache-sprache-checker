import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Github link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Eleonore/i);
  expect(linkElement).toBeInTheDocument();
});
