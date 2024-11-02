const POST = {
  TEXT: { MAX_LENGTH: 4000 },
  COMMENT: { MAX_LENGTH: 280 },
  NEXT_POST_ALLOWED_AT: 24 * 60 * 60 * 1000, // 24 hours
  IMAGE_POST: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ACCEPTED_MIME_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
  },
  VIDEO_POST: {
    MAX_SIZE: 50 * 1024 * 1024, // 50MB
    ACCEPTED_MIME_TYPES: ["video/mp4"],
    MAX_DURATION: 60, // seconds
  },
  AUDIO_POST: {
    ACCEPTED_MIME_TYPES: [
      "audio/wav",
      "audio/flac",
      "audio/aac",
      "audio/mp3",
      "audio/opus",
      "audio/ogg",
    ],
  },
  POST_MEDIA_CAPTION: {
    MAX_LENGTH: 150,
  },
};

const USER = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
  },
  BIO: { MAX_LENGTH: 150 },
  DISPLAY_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 30,
  },
  AVATAR_MAX_SIZE: 2 * 1024 * 1024, // 2MB
};

const WEIGHTS = {
  LIKE: 1,
  COMMENT: 3,
  VIEW: 0.5,
  POST_TYPE_MULTIPLIER: {
    TEXT: 1,
    IMAGE: 1.2,
    VIDEO: 1.5,
    AUDIO: 1.3,
  },
  SUBSCRIBER_BONUS: 0.1,
  TIME_DECAY_FACTOR: 0.01,
};

const ASSET_FOLDERS = {
  POSTS: "posts",
  AVATARS: "avatars",
};

const NOTIFICATION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

const REPORT = {
  DESCRIPTION: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 280,
  },
};

export const CONSTANTS = {
  POST,
  USER,
  WEIGHTS,
  ASSET_FOLDERS,
  NOTIFICATION_TTL,
  REPORT,
};

export enum FeedType {
  TRENDING = "TRENDING",
  FRESH = "FRESH",
  SUBSCRIBED = "SUBSCRIBED",
}

export enum Events {
  NOTIFICATION_CREATE = "notification.create",
}
