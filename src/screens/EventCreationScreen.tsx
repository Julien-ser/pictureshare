import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { createEvent } from '../services/eventService';
import { generateEventCode } from '../utils/codeGenerator';
import type { Event } from '../types';
import QRCodeDisplay from '../components/QRCodeDisplay';

interface Props {
  onEventCreated?: (event: Event) => void;
}

const EventCreationScreen: React.FC<Props> = ({ onEventCreated }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [eventCode, setEventCode] = useState<string>('');
  const [maxDurationHours, setMaxDurationHours] = useState<string>('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);

  // Generate initial code on mount
  useEffect(() => {
    generateNewCode();
  }, []);

  const generateNewCode = useCallback(async () => {
    setGeneratingCode(true);
    try {
      const code = await generateEventCode();
      setEventCode(code);
    } catch (error) {
      console.error('Failed to generate code:', error);
      Alert.alert('Error', 'Failed to generate event code');
    } finally {
      setGeneratingCode(false);
    }
  }, []);

  const handleCreateEvent = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create an event');
      return;
    }

    if (!eventCode) {
      Alert.alert('Error', 'Event code not generated');
      return;
    }

    const duration = maxDurationHours ? parseInt(maxDurationHours, 10) : undefined;
    if (maxDurationHours && (isNaN(duration!) || duration! <= 0)) {
      Alert.alert('Invalid Duration', 'Please enter a valid number of hours');
      return;
    }

    setLoading(true);
    try {
      const event = await createEvent(
        title.trim() || 'Untitled Event',
        user.id,
        duration,
        isPublic
      );

      // Set current event and show QR code
      setCurrentEvent(event);
      setShowQRCode(true);

      Alert.alert('Success', `Event created! Code: ${event.code}`, [
        {
          text: 'OK',
          onPress: () => {
            if (onEventCreated) {
              onEventCreated(event);
            }
          },
        },
      ]);
    } catch (error) {
      console.error('Failed to create event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Event</Text>

      {/* Event Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Event Name (optional)</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter event name"
          placeholderTextColor="#999"
        />
      </View>

      {/* Event Code */}
      <View style={styles.codeSection}>
        <Text style={styles.label}>Event Code</Text>
        <View style={styles.codeDisplay}>
          <Text style={styles.codeText}>{generatingCode ? '...' : eventCode}</Text>
          <TouchableOpacity
            style={[styles.button, styles.regenerateButton]}
            onPress={generateNewCode}
            disabled={generatingCode}
          >
            {generatingCode ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Regenerate</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.helperText}>Share this 6-digit code with participants</Text>
      </View>

      {/* Duration Setting */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration (hours, optional)</Text>
        <TextInput
          style={styles.input}
          value={maxDurationHours}
          onChangeText={setMaxDurationHours}
          placeholder="e.g., 2"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      {/* Visibility Toggle */}
      <View style={styles.toggleSection}>
        <Text style={styles.label}>Visibility: {isPublic ? 'Public' : 'Private'}</Text>
        <TouchableOpacity
          style={[styles.toggle, isPublic ? styles.toggleOn : styles.toggleOff]}
          onPress={() => setIsPublic(!isPublic)}
        >
          <View style={[styles.toggleKnob, isPublic && styles.toggleKnobOn]} />
        </TouchableOpacity>
      </View>

      {/* Create Button */}
      <TouchableOpacity
        style={[styles.button, styles.createButton, loading && styles.buttonDisabled]}
        onPress={handleCreateEvent}
        disabled={loading || !eventCode}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Event</Text>
        )}
      </TouchableOpacity>

      {/* QR Code Display */}
      {showQRCode && currentEvent && (
        <View style={styles.qrSection}>
          <View style={styles.qrHeader}>
            <Text style={styles.qrTitle}>Event Created!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowQRCode(false);
                setCurrentEvent(null);
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <QRCodeDisplay eventCode={currentEvent.code} eventId={currentEvent.id} />

          {currentEvent.title && <Text style={styles.eventTitle}>{currentEvent.title}</Text>}

          <Text style={styles.shareInstructions}>
            Share this QR code with participants. They can scan it to join your event.
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.createAnotherButton]}
            onPress={() => {
              setShowQRCode(false);
              setCurrentEvent(null);
              setTitle('');
              setMaxDurationHours('');
              generateNewCode();
            }}
          >
            <Text style={styles.buttonText}>Create Another Event</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  codeSection: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  codeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 4,
    flex: 1,
  },
  regenerateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    backgroundColor: '#ddd',
  },
  toggleOn: {
    backgroundColor: '#34C759',
  },
  toggleOff: {
    backgroundColor: '#ccc',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  toggleKnobOn: {
    alignSelf: 'flex-end',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventCreationScreen;
