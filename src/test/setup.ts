import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Konfiguracja środowiska testowego
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    query: {},
    pathname: '/',
  }),
}));

// Czyszczenie po każdym teście
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
