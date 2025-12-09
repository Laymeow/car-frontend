import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carlist from './Carlist';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

    const loading = await screen.findByText(/Loading/i);
    expect(loading).toBeInTheDocument();
  });

  test('fetches and displays cars', async () => {
    render(<Carlist />, { wrapper: createWrapper });

    const car = await screen.findByText(/Lexus/i);
    expect(car).toBeInTheDocument();

    const newCarButton = await screen.findByText(/New Car/i);
    expect(newCarButton).toBeInTheDocument();
  });

  test('opens new car modal when "New Car" button is clicked', async () => {
    render(<Carlist />, { wrapper: createWrapper });

    const newCarButton = await screen.findByText(/New Car/i);
    await userEvent.click(newCarButton);

    const saveButton = await screen.findByText(/Save/i);
    expect(saveButton).toBeInTheDocument();
  });
});
