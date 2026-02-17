// Vyxlo Auth API Hook
// Frontend helper for auth API calls

import { useState } from 'react';

const API_BASE = '/api/v1';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  orgName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Registration failed');
      }

      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Login failed');
      }

      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Logout failed');
      }

      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/users/me`, {
        credentials: 'include', // Include cookies
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to fetch user');
      }

      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Include cookies
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Token refresh failed');
      }

      return result.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Token refresh failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    getMe,
    refresh,
    loading,
    error,
  };
}
