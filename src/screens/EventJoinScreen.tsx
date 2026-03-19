import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

/**
 * Event Join Screen Wireframe
 * Shows QR scanner and manual code entry
 */
const EventJoinScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Join Event</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* QR Scanner Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scan QR Code</Text>
          <View style={styles.scannerPlaceholder}>
            <Text style={styles.placeholderText}>Camera View</Text>
            <Text style={styles.helperText}>Align QR code within frame</Text>
          </View>
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
          <View style={styles.codeInputPlaceholder}>
            <Text style={styles.placeholderText}>6-digit code input</Text>
          </View>
          <View style={styles.joinButtonPlaceholder}>
            <Text style={styles.buttonText}>Join Event</Text>
          </View>
        </View>

        {/* Recent Events */}
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
      </ScrollView>
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
  scannerPlaceholder: {
    height: 200,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
  helperText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
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
  codeInputPlaceholder: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  joinButtonPlaceholder: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
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
});

export default EventJoinScreen;
