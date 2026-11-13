import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Staff Sign In', headerBackVisible: false }} />
        <Stack.Screen name="leads" options={{ title: 'Leads & Inquiries' }} />
        <Stack.Screen name="properties" options={{ title: 'Dubai Luxury Inventory' }} />
      </Stack>
    </AuthProvider>
  );
}
