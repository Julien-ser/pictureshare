import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>PictureShare App</Text>
        <Text>Phase 1: Setup in progress</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
