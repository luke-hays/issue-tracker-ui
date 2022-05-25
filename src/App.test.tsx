import { render, screen } from '@testing-library/react';

import App from './App';

test('has example test case', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello React Webpack/i);
  expect(linkElement).toBeInTheDocument();
});
