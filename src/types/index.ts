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
};
