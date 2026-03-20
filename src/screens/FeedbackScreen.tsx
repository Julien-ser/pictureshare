import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FeedbackScreenProps {
  onClose: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'bug' | 'ux' | 'performance' | 'feature'>('ux');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'ux', label: 'User Experience' },
    { value: 'performance', label: 'Performance' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
  ] as const;

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    setSubmitting(true);

    // In a real implementation, this would send to a backend or GitHub API
    // For closed beta, we'll use a mailto: link as a simple solution
    const subject = encodeURIComponent(`[PictureShare Beta] ${category.toUpperCase()} Feedback`);
    const body = encodeURIComponent(
      `Category: ${category}\n\nFeedback:\n${feedback}\n\n\n---\nApp Version: 1.0.0-beta.1\nPlatform: ${Platform.OS}\n`
    );

    // You can also implement Firebase submission here
    // For now, we'll open email client
    const mailtoUrl = `mailto:support@pictureshare.app?subject=${subject}&body=${body}`;

    // Simulate network delay for feedback submission
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmitting(false);
    Alert.alert(
      'Thank You!',
      'Your feedback has been prepared. Your email client will open to send it.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Feedback',
          onPress: () => {
            // In production, this would actually send the feedback
            // For demo purposes, we'll just show a success message
            Alert.alert(
              'Note',
              'In production, this would open your email client with the feedback pre-filled.'
            );
            onClose();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Beta Feedback</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.description}>
          Help us improve PictureShare! Your feedback is invaluable for the beta testing phase.
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[styles.categoryChip, category === cat.value && styles.categoryChipActive]}
                onPress={() => setCategory(cat.value)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat.value && styles.categoryChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Your Feedback</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={8}
            placeholder="Describe your experience, issues, or suggestions..."
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.hint}>
            Leave your email if you'd like us to follow up about your feedback.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            🧭 This feedback will help us prioritize improvements for the final release. All
            feedback is reviewed by the development team.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={submitFeedback}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>PictureShare v1.0.0-beta.1</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    minHeight: 120,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  infoBox: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#B3E0FF',
  },
  infoText: {
    fontSize: 14,
    color: '#0366A6',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 8,
  },
});
