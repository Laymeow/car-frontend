// src/components/Carlist.test.tsx

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carlist from './Carlist';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock fetch globally before each test
beforeEach(() => {
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
});

// Helper to create a new QueryClient for each test
const createWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('Carlist Component', () => {
  test('shows loading initially', async () => {
    render(<Carlist />, { wrapper: createWrapper });

    // Wait for the "Loading" text to appear
    const loading = await screen.findByText(/Loading/i);
    expect(loading).toBeInTheDocument();
  });

  test('fetches and displays cars', async () => {
    render(<Carlist />, { wrapper: createWrapper });

    // Wait for the fetched car to appear
    const car = await screen.findByText(/Lexus/i);
    expect(car).toBeInTheDocument();

    // Also check the "New Car" button exists
    const newCarButton = await screen.findByText(/New Car/i);
    expect(newCarButton).toBeInTheDocument();
  });

  test('opens new car modal when "New Car" button is clicked', async () => {
    render(<Carlist />, { wrapper: createWrapper });

    // Wait for the button and click it
    const newCarButton = await screen.findByText(/New Car/i);
    await userEvent.click(newCarButton);

    // Wait for modal elements, like "Save" button, to appear
    const saveButton = await screen.findByText(/Save/i);
    expect(saveButton).toBeInTheDocument();
  });
});
