'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { register, login } from '@/lib/api/clientApi';
import css from './AuthForm.module.css';

interface AuthFormProps {
  mode: 'sign-up' | 'sign-in';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const user =
        mode === 'sign-up'
          ? await register({ email, password })
          : await login({ email, password });

      setUser(user);
      router.push('/profile');
    } catch {
      setError('Something went wrong. Please check your email and password.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.title}>
        {mode === 'sign-up' ? 'Sign up' : 'Sign in'}
      </h1>

      <label className={css.label}>
        Email
        <input
          className={css.input}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label className={css.label}>
        Password
        <input
          className={css.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      {error && <p className={css.error}>{error}</p>}

      <button className={css.button} type="submit">
        {mode === 'sign-up' ? 'Register' : 'Log in'}
      </button>
    </form>
  );
}
