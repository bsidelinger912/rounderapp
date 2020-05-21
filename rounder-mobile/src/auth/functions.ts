import * as SecureStore from 'expo-secure-store';

import { serviceBase } from '../config';

interface LoginResultSuccess {
  success: true;
  token: string;
}

interface LoginResultFail {
  success: false;
  error: string;
}

type LoginResult = LoginResultSuccess | LoginResultFail;

const userNameKey = 'USER_NAME';
const passwordKey = 'PASSWORD';

export async function login(email: string, password: string): Promise<LoginResult> {
  try {
    const resp = await fetch(`${serviceBase}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await resp.json();

    if (resp.ok) {
      SecureStore.setItemAsync(userNameKey, email);
      SecureStore.setItemAsync(passwordKey, password);

      return {
        success: true,
        token: json.token,
      };
    }

    return { success: false, error: json.message };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function signup(email: string, password: string): Promise<LoginResult> {
  try {
    const resp = await fetch(`${serviceBase}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await resp.json();

    if (resp.ok) {
      SecureStore.setItemAsync(userNameKey, email);
      SecureStore.setItemAsync(passwordKey, password);

      return {
        success: true,
        token: json.token,
      };
    }

    return { success: false, error: json.message };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function checkLogin(): Promise<LoginResult> {
  const userName = await SecureStore.getItemAsync(userNameKey);
  const password = await SecureStore.getItemAsync(passwordKey);

  if (!userName || !password) {
    return { success: false, error: 'user credentials not stored' };
  }

  const result = await login(userName, password);
  return result;
}

export async function removePassword(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(userNameKey),
    SecureStore.deleteItemAsync(passwordKey),
  ]);
}
