'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      setUser(response.data.user);
      toast.success('Logged in successfully');
      router.push('/products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || 'Login failed');
      }
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      toast.success(response.data.message);
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || 'Registration failed');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.post('/api/auth/verify-email', { token });
      toast.success(response.data.message);
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || 'Email verification failed');
      }
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    verifyEmail,
  };
}