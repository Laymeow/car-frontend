// src/App.test.tsx

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/vitest'; // REMOVED: Now in vitest.setup.ts
// import { vi } from 'vitest'; // REMOVED: Global setup is in vitest.setup.ts

// REMOVED: Global fetch mock moved to vitest.setup.ts
/*
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          brand: 'Lexus',
          model: 'LS200',
          color: 'blue',
          price: 7000,
        },
      ]),
  })
) as any;
*/

import App from './App'; // Assuming App is one level up

describe('App', () => {
  test('renders header with "Car Shop"', () => {
    render(<App />);
    expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
  });
});