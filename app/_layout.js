import { Stack } from 'expo-router/stack';

export default function Layout() {
    return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#CD0034',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    );
  }