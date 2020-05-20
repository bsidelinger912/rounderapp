import * as SecureStore from 'expo-secure-store';

import { serviceBase } from '../config';

interface LoginResultSuccess {
  success: true;
  token: string;
}

interface LoginResultFail {
  success: false;
}

type LoginResult = LoginResultSuccess | LoginResultFail;

const userNameKey = 'USER_NAME';
const passwordKey = 'PASSWORD';

export async function login(userName: string, password: string): Promise<LoginResult> {
  try {
    const resp = await fetch(`${serviceBase}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: userName, password }),
    });

    if (resp.ok) {
      const json = await resp.json();

      SecureStore.setItemAsync(userNameKey, userName);
      SecureStore.setItemAsync(passwordKey, password);

      return {
        success: true,
        token: json.token,
      };
    }

    return { success: false };
  } catch (e) {
    return { success: false };
  }
}

export async function signup(userName: string, password: string): Promise<LoginResult> {
  try {
    const resp = await fetch(`${serviceBase}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ email: userName, password }),
    });

    if (resp.ok) {
      const json = await resp.json();

      return {
        success: true,
        token: json.token,
      };
    }

    return { success: false };
  } catch (e) {
    return { success: false };
  }
}

export async function checkLogin(): Promise<LoginResult> {
  const userName = await SecureStore.getItemAsync(userNameKey);
  const password = await SecureStore.getItemAsync(passwordKey);

  if (!userName || !password) {
    return { success: false };
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
