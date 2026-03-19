import React from 'react';
import { SafeAreaView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { EventProvider, useEvent } from './src/contexts/EventContext';
import { PhotoProvider } from './src/contexts/PhotoContext';
import LoginScreen from './src/screens/LoginScreen';
import PhotoFeedScreen from './src/screens/PhotoFeedScreen';

function MainNavigator() {
  const { user, loading } = useAuth();
  const { currentEvent, setCurrentEvent } = useEvent();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  // If user has joined an event, show photo feed
  if (currentEvent) {
    return <PhotoFeedScreen />;
  }

  // Otherwise, show join/event creation screen (simplified for now)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Welcome, {user.displayName || 'User'}!</Text>
      <Text style={styles.subtext}>No active event. Scan QR or create event.</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <MainNavigator />
      </EventProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
