import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL_KEY = 'wc_api_base_url';
const TOKEN_KEY = 'wc_auth_token';
const USER_KEY = 'wc_auth_user';

// Fallback to local machine backend or production domain
export const DEFAULT_API_URL = 'https://api.whitecaves.ae/api';

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  role?: string;
  departmentId?: string;
}

export async function setAuthToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

export async function getAuthToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return AsyncStorage.getItem(TOKEN_KEY);
  }
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeAuthToken(): Promise<void> {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

export async function setUserSession(user: UserSession): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUserSession(): Promise<UserSession | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as UserSession;
  } catch {
    return null;
  }
}

export async function clearUserSession(): Promise<void> {
  await removeAuthToken();
  await AsyncStorage.removeItem(USER_KEY);
}

export async function getApiBaseUrl(): Promise<string> {
  const customUrl = await AsyncStorage.getItem(API_BASE_URL_KEY);
  return customUrl || DEFAULT_API_URL;
}

export async function setApiBaseUrl(url: string): Promise<void> {
  await AsyncStorage.setItem(API_BASE_URL_KEY, url);
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = await getApiBaseUrl();
  const token = await getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${baseUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(json.message || `Request failed with status ${response.status}`);
  }

  return json as T;
}
