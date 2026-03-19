import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { addComment } from '../services/commentService';
import { subscribeToComments } from '../services/commentService';
import { type Unsubscribe } from 'firebase/firestore';
import CommentItem from './CommentItem';
import type { Comment as CommentType } from '../services/commentService';

interface CommentsModalProps {
  visible: boolean;
  photoId: string;
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ visible, photoId, onClose }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);

  // Subscribe to real-time comments updates
  useEffect(() => {
    if (!visible || !photoId) return;

    setLoading(true);
    const unsub = subscribeToComments(photoId, (updatedComments) => {
      setComments(updatedComments);
      setLoading(false);
    });

    setUnsubscribe(unsub);

    return () => {
      unsub();
    };
  }, [visible, photoId]);

  const handleAddComment = useCallback(async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to comment');
      return;
    }

    const text = newCommentText.trim();
    if (!text) {
      Alert.alert('Error', 'Comment cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      await addComment(photoId, user.id, text);
      setNewCommentText('');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  }, [user, photoId, newCommentText]);

  const handleDeleteComment = useCallback((commentId: string) => {
    // The CommentItem component handles deletion and updates the parent state via re-render
    // Just clear the cache to trigger refresh
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }, []);

  const renderComment = ({ item }: { item: CommentType }) => (
    <CommentItem comment={item} onDelete={() => handleDeleteComment(item.id)} />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Comments</Text>
          <View style={styles.dummyButton} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No comments yet. Be the first!</Text>
              </View>
            }
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={newCommentText}
            onChangeText={setNewCommentText}
            multiline
            maxLength={500}
            editable={!!user}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!user || !newCommentText.trim() || submitting) && styles.sendButtonDisabled,
            ]}
            onPress={handleAddComment}
            disabled={!user || !newCommentText.trim() || submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  cancelButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dummyButton: {
    width: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsList: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommentsModal;
