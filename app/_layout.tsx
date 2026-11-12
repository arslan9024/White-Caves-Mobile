import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#090D16',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'White Caves CRM',
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
