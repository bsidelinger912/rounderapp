import { useState, useCallback } from 'react';
import { User } from 'rounder-shared';

import { login, signup } from './functions';

type UserArgs = Pick<User, 'email' | 'password'>;

interface LoginSignupHook {
  invoke(args: UserArgs): Promise<string | undefined>;
  loading: boolean;
  error?: string;
}

interface LoginSignupHookOptions {
  onSuccess?: (token: string) => void;
}

export function useLogin(options: LoginSignupHookOptions): LoginSignupHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const invoke = useCallback(async (args: UserArgs): Promise<string | undefined> => {
    setLoading(true);

    const result = await login(args.email, args.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return undefined;
    }

    setLoading(false);

    if (options.onSuccess) {
      options.onSuccess(result.token);
    }

    return result.token;
  }, []);

  return {
    loading,
    error,
    invoke,
  };
}

export function useSignup(options: LoginSignupHookOptions): LoginSignupHook {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const invoke = useCallback(async (args: UserArgs): Promise<string | undefined> => {
    setLoading(true);

    const result = await signup(args.email, args.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return undefined;
    }

    setLoading(false);

    if (options.onSuccess) {
      options.onSuccess(result.token);
    }

    return result.token;
  }, []);

  return {
    loading,
    error,
    invoke,
  };
}
