// auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { supabase } from './supabaseClient';

// Keys for storing tokens
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Save session tokens
export const saveSession = async (session: any) => {
  if (!session) return;
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, session.access_token);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
};

// Clear session (logout)
export const clearSession = async (navigation?: any) => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);

  // Optional: redirect to Login screen
  if (navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }
};

// Get current access token
export const getAccessToken = async () => {
  return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

// ------------------ AUTH FUNCTIONS ------------------

// Sign Up
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

// Sign In
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  // Save tokens locally
  await saveSession(data.session);
  return data;
};

// Refresh access token
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;  // OK

  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (error) return null; // return null instead of undefined

  await saveSession(data.session);
  return data?.session?.access_token ?? null; // ensure it's string | null
};


// ------------------ FETCH HELPER ------------------

// Use this helper to call protected APIs
export const fetchWithAuth = async (url: string, options: any = {}) => {
  let token = await getAccessToken();

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  let res = await fetch(url, options);

  // If access token expired, try refresh
  if (res.status === 401) {
    if(token) token = await refreshAccessToken();
    if (!token) throw new Error('Session expired, please login again');

    options.headers.Authorization = `Bearer ${token}`;
    res = await fetch(url, options);
  }

  return res.json();
};
