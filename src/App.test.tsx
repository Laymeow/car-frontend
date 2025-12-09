import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';


import App from './App';

describe('App', () => {
  test('renders header with "Car Shop"', () => {
    render(<App />);
    expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
  });
});