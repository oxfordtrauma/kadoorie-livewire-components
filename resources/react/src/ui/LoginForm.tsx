/**
 * Project: Kadoorie Livewire Components
 * File: LoginForm.tsx
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

import { useState, type FormEvent } from 'react';
import { Field } from './Field';
import { Input } from './Input';
import { Checkbox } from './Choice';
import { Button } from './Button';
import { Icon } from './Icon';

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  forgotUrl?: string;
  rememberable?: boolean;
  heading?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Presentational, auth-agnostic login form with client-side validation. The
 * password never leaves component state until the host's `onSubmit` runs — it
 * is never dispatched or serialised. Mirrors the Blade/Livewire login page.
 */
export function LoginForm({
  onSubmit,
  forgotUrl,
  rememberable = true,
  heading = 'Sign in',
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};

    if (email === '') {
      nextErrors.email = 'The email field is required.';
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = 'The email must be a valid email address.';
    }

    if (password === '') {
      nextErrors.password = 'The password field is required.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({ email, password, remember });
  }

  return (
    <div data-test="login-page" className="flex min-h-dvh items-center justify-center bg-bg p-4">
      <main id="main-content" className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <Icon name="kadoorie:leaf" size="lg" className="text-primary" label="Kadoorie" />
          <h1 className="text-2xl font-semibold text-text" data-test="login-heading">
            {heading}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          data-test="login-form"
          noValidate
          className="flex flex-col gap-4"
        >
          <Field label="Email" name="email" error={errors.email}>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </Field>

          <Field label="Password" name="password" error={errors.password}>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </Field>

          <div className="flex items-center justify-between gap-3">
            {rememberable ? (
              <Checkbox
                name="remember"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                label="Remember me"
              />
            ) : (
              <span />
            )}

            {forgotUrl !== undefined ? (
              <a
                href={forgotUrl}
                data-test="login-forgot"
                className="kad-focusable rounded text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </a>
            ) : null}
          </div>

          <Button type="submit" data-test="login-submit" className="w-full">
            {heading}
          </Button>
        </form>
      </main>
    </div>
  );
}
