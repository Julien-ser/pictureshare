import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

/**
 * Photo Feed Screen Wireframe
 * Shows real-time photo feed with infinite scroll and interactions
 */
interface Photo {
  id: string;
  uri: string;
  uploaderName: string;
  createdAt: Date;
  likes: number;
  comments: number;
}

const PhotoFeedScreen: React.FC = () => {
  // Mock data for wireframe
  const mockPhotos: Photo[] = [
    {
      id: '1',
      uri: 'photo1.jpg',
      uploaderName: 'Alice',
      createdAt: new Date(),
      likes: 12,
      comments: 3,
    },
    {
      id: '2',
      uri: 'photo2.jpg',
      uploaderName: 'Bob',
      createdAt: new Date(),
      likes: 8,
      comments: 1,
    },
    {
      id: '3',
      uri: 'photo3.jpg',
      uploaderName: 'Carol',
      createdAt: new Date(),
      likes: 15,
      comments: 5,
    },
  ];

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoCard}>
      {/* Photo Image */}
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoLabel}>Photo Content</Text>
        <Text style={styles.uploaderName}>{item.uploaderName}</Text>
      </View>

      {/* Photo Actions */}
      <View style={styles.photoActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionText}>{item.likes} likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comments} comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>✏️</Text>
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>

      {/* Timestamp */}
      <Text style={styles.timestamp}>2 hours ago</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Event Photos</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Photo Feed */}
      <FlatList
        data={mockPhotos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        onEndReached={() => console.log('Load more...')}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Text style={styles.loading}>Loading more...</Text>}
      />

      {/* Upload Indicator */}
      <View style={styles.uploadIndicator}>
        <Text style={styles.uploadIndicatorText}>Uploading...</Text>
        <View style={styles.progressBar} />
      </View>
    </View>
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
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  feed: {
    padding: 10,
  },
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLabel: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  uploaderName: {
    fontSize: 14,
    color: '#666',
  },
  photoActions: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    fontSize: 12,
    color: '#999',
  },
  loading: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
  uploadIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadIndicatorText: {
    color: '#fff',
    fontSize: 14,
  },
  progressBar: {
    width: 100,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
});

export default PhotoFeedScreen;
