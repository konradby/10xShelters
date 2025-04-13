import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Mock Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(),
}));

describe('useAuth', () => {
  const mockSession = {
    user: {
      id: '123',
      email: 'test@example.com',
      user_metadata: {
        role: 'user',
      },
    },
  };

  const mockSupabase = {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  };

  beforeEach(() => {
    (createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase);
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should set auth state when session exists', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toEqual({
      id: '123',
      email: 'test@example.com',
      role: 'user',
    });
  });

  it('should handle auth state changes', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    const mockCallback = jest.fn();
    mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
      mockCallback(callback);
      return { subscription: { unsubscribe: jest.fn() } };
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoggedIn).toBe(false);

    await act(async () => {
      mockCallback('SIGNED_IN', mockSession);
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toEqual({
      id: '123',
      email: 'test@example.com',
      role: 'user',
    });
  });

  it('should handle errors', async () => {
    const mockError = new Error('Auth error');
    mockSupabase.auth.getSession.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
