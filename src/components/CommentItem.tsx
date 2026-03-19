import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { deleteComment } from '../services/commentService';
import type { Comment as CommentType } from '../services/commentService';

interface CommentItemProps {
  comment: CommentType;
  onDelete?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user?.id === comment.userId;

  const handleDelete = async () => {
    if (!user) {
      alert('You must be logged in to delete comments');
      return;
    }

    try {
      await deleteComment(comment.photoId, comment.id, user.id);
      onDelete?.();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete comment');
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userId}>{comment.userId.substring(0, 8)}...</Text>
        <Text style={styles.timestamp}>{formatTime(comment.createdAt)}</Text>
      </View>
      <Text style={styles.text}>{comment.text}</Text>
      {isOwner && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  userId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
  },
  deleteText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});

export default CommentItem;
