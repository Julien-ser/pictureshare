import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useAuth } from '../contexts/AuthContext';
import { useEvent } from '../contexts/EventContext';
import { getEventByCode, joinEvent } from '../services/eventService';

type JoinStatus = 'idle' | 'scanning' | 'loading' | 'success' | 'error';

const EventJoinScreen: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentEvent } = useEvent();
  const [manualCode, setManualCode] = useState('');
  const [joinStatus, setJoinStatus] = useState<JoinStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [joinedEvent, setJoinedEvent] = useState<{ code: string; title?: string } | null>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (joinStatus === 'loading') return;

    // Extract event code from QR data (could be just code or a deep link)
    const eventCode = extractEventCode(data);

    if (!eventCode) {
      setErrorMessage('Invalid QR code format');
      setJoinStatus('error');
      return;
    }

    await joinEventByCode(eventCode);
  };

  const extractEventCode = (data: string): string | null => {
    // If it's just a 6-character alphanumeric code
    if (/^[A-Za-z0-9]{6}$/.test(data.trim())) {
      return data.trim().toUpperCase();
    }

    // Try to extract from a deep link like pictureshare://event?code=ABC123
    const match = data.match(/[?&]code=([A-Za-z0-9]{6})/i);
    if (match) {
      return match[1].toUpperCase();
    }

    return null;
  };

  const joinEventByCode = async (code: string) => {
    if (!user) {
      Alert.alert('Error', 'You must be signed in to join an event');
      return;
    }

    setJoinStatus('loading');
    setErrorMessage(null);

    try {
      // Find event by code
      const event = await getEventByCode(code);

      if (!event) {
        setErrorMessage('Event not found. Please check the code and try again.');
        setJoinStatus('error');
        return;
      }

      // Check if user is already a participant
      if (event.participants.includes(user.id)) {
        setJoinedEvent({ code: event.code, title: event.title });
        setCurrentEvent(event); // Set current event in context
        setJoinStatus('success');
        return;
      }

      // Join the event
      await joinEvent(event.id, user.id);

      setJoinedEvent({ code: event.code, title: event.title });
      setCurrentEvent(event); // Set current event in context
      setJoinStatus('success');
    } catch (error) {
      console.error('Error joining event:', error);
      setErrorMessage('Failed to join event. Please try again.');
      setJoinStatus('error');
    }
  };

  const handleManualJoin = async () => {
    const code = manualCode.trim().toUpperCase();
    if (!code) {
      setErrorMessage('Please enter a code');
      return;
    }
    await joinEventByCode(code);
  };

  const resetToIdle = () => {
    setJoinStatus('idle');
    setErrorMessage(null);
    setJoinedEvent(null);
    setManualCode('');
  };

  const renderContent = () => {
    if (joinStatus === 'success' && joinedEvent) {
      return (
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Event Joined!</Text>
          <Text style={styles.successMessage}>
            You've joined "{joinedEvent.title || 'Event'}" (Code: {joinedEvent.code})
          </Text>
          <TouchableOpacity style={styles.continueButton} onPress={resetToIdle}>
            <Text style={styles.continueButtonText}>Join Another Event</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (joinStatus === 'error') {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠</Text>
          <Text style={styles.errorTitle}>Cannot Join Event</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={resetToIdle}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (joinStatus === 'loading') {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Joining event...</Text>
        </View>
      );
    }

    return (
      <>
        {/* QR Scanner Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scan QR Code</Text>
          {permission?.granted ? (
            <View style={styles.cameraContainer}>
              <Camera
                style={styles.camera}
                type={CameraType.back}
                onBarCodeScanned={joinStatus === 'idle' ? handleBarCodeScanned : undefined}
                barCodeScannerSettings={{
                  barCodeTypes: ['qr'],
                }}
              >
                <View style={styles.cameraOverlay}>
                  <View style={styles.scanFrame} />
                  <Text style={styles.scanInstruction}>Position QR code within the frame</Text>
                </View>
              </Camera>
            </View>
          ) : (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionText}>Camera permission required</Text>
              <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* OR Divider */}
        <View style={styles.orDivider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Manual Code Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enter Code Manually</Text>
          <TextInput
            style={styles.codeInput}
            placeholder="Enter 6-digit code"
            value={manualCode}
            onChangeText={setManualCode}
            autoCapitalize="characters"
            maxLength={6}
          />
          <TouchableOpacity
            style={[styles.joinButton, manualCode.length !== 6 && styles.joinButtonDisabled]}
            onPress={handleManualJoin}
            disabled={manualCode.length !== 6 || joinStatus !== 'idle'}
          >
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Events (placeholder - would need to fetch from Firestore) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Events</Text>
          <View style={styles.eventListItem}>
            <Text style={styles.eventCode}>ABC123</Text>
            <Text style={styles.eventName}>Beach Party</Text>
          </View>
          <View style={styles.eventListItem}>
            <Text style={styles.eventCode}>XYZ789</Text>
            <Text style={styles.eventName}>Birthday Dinner</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Join Event</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>{renderContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  cameraContainer: {
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scanInstruction: {
    marginTop: 20,
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  permissionContainer: {
    height: 200,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
    fontWeight: '600',
  },
  codeInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 15,
  },
  joinButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#ccc',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  eventListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  eventCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  eventName: {
    fontSize: 16,
    color: '#333',
  },
  // Status styles
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  successIcon: {
    fontSize: 60,
    color: '#4CAF50',
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorIcon: {
    fontSize: 60,
    color: '#f44336',
    marginBottom: 15,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventJoinScreen;
