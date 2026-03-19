import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface Props {
  eventCode: string;
  eventId?: string;
  size?: number;
}

const QRCodeDisplay: React.FC<Props> = ({ eventCode, eventId, size = 200 }) => {
  // Use eventId for deep link if available (preferred), fallback to eventCode
  const deepLink = eventId
    ? `pictureshare://event/${eventId}`
    : `pictureshare://join?code=${eventCode}`;

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode value={deepLink} size={size} color="black" backgroundColor="white" quietZone={10} />
      </View>
      <Text style={styles.codeText}>{eventCode}</Text>
      <Text style={styles.helperText}>Scan to join this event</Text>
      <Text style={styles.deepLinkText} numberOfLines={1}>
        {deepLink}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  qrContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 4,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  deepLinkText: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'monospace',
    textAlign: 'center',
    maxWidth: Dimensions.get('window').width - 80,
  },
});

export default QRCodeDisplay;
