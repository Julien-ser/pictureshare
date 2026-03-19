import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { signInAnonymously, signInWithGoogle } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleAnonymousSignIn = async () => {
    try {
      setLoading(true);
      await signInAnonymously();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in anonymously');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PictureShare</Text>
      <Text style={styles.subtitle}>Sign in to share photos</Text>

      <TouchableOpacity
        style={[styles.button, styles.anonymousButton]}
        onPress={handleAnonymousSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue as Guest</Text>
        )}
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.googleButtonText]}>Sign in with Google</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  anonymousButton: {
    backgroundColor: '#007AFF',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  googleButtonText: {
    color: '#333',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
