export type User = {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
};

export type Event = {
  id: string;
  code: string;
  createdAt: any;
  createdBy: string;
  participants: string[];
  title?: string; // Optional event title
  settings?: {
    maxDuration?: number;
    isPublic?: boolean;
  };
};

export type Photo = {
  id: string;
  eventId: string;
  uploaderId: string;
  storagePath: string;
  thumbnailPath?: string;
  createdAt: any;
  width: number;
  height: number;
  likeCount?: number; // Aggregated count of likes
  commentCount?: number; // Aggregated count of comments
  localUri?: string; // Local URI for pending photos (optimistic UI)
};

export type Comment = {
  id: string;
  photoId: string;
  userId: string;
  text: string;
  createdAt: any;
};
