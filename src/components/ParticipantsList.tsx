import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useEvent } from '../contexts/EventContext';
import { getEnrichedParticipants, type ParticipantWithStats } from '../services/participantService';

interface ParticipantItemProps {
  participant: ParticipantWithStats & { isCurrentUser: boolean };
}

const ParticipantItem: React.FC<ParticipantItemProps> = ({ participant }) => {
  const { isCurrentUser } = participant;
  const displayName = participant.displayName || `User ${participant.userId.substring(0, 8)}`;

  // Placeholder avatar - in a real app would use photoURL
  const avatarUrl =
    participant.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&size=128`;

  return (
    <View style={[styles.participantItem, isCurrentUser && styles.currentUserItem]}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        {isCurrentUser && (
          <View style={styles.currentUserBadge}>
            <Text style={styles.currentUserBadgeText}>You</Text>
          </View>
        )}
      </View>
      <View style={styles.participantInfo}>
        <Text style={styles.participantName} numberOfLines={1}>
          {displayName}
          {isCurrentUser && ' (You)'}
        </Text>
        <Text style={styles.photoCount}>{participant.photoCount} photo(s)</Text>
      </View>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{participant.photoCount}</Text>
      </View>
    </View>
  );
};

interface ParticipantsListProps {
  eventId: string;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ eventId }) => {
  const { user } = useAuth();
  const { currentEvent } = useEvent();
  const [participants, setParticipants] = useState<
    (ParticipantWithStats & { isCurrentUser: boolean })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!eventId) {
        setParticipants([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const enrichedParticipants = await getEnrichedParticipants(eventId, user?.id);
        setParticipants(enrichedParticipants);
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError('Failed to load participants');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId, user]);

  const effectiveEventId = eventId || currentEvent?.id;

  if (!effectiveEventId) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No event selected</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading participants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (participants.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>👥</Text>
        <Text style={styles.emptyTitle}>No participants yet</Text>
        <Text style={styles.emptyMessage}>Be the first to join this event and share photos!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={participants}
      keyExtractor={(item) => item.userId}
      renderItem={({ item }) => <ParticipantItem participant={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text style={styles.listHeader}>
          {participants.length} participant{participants.length !== 1 ? 's' : ''}
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  listHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currentUserItem: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  currentUserBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  currentUserBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  photoCount: {
    fontSize: 14,
    color: '#666',
  },
  rankBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ParticipantsList;
