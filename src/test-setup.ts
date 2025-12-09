import '@testing-library/jest-dom';
import { vi } from 'vitest';

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
