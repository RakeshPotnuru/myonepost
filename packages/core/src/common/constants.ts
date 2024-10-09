const POST = {
  TEXT: { MAX_LENGTH: 4000 },
  COMMENT: { MAX_LENGTH: 280 },
  NEXT_POST_ALLOWED_AT: 24 * 60 * 60 * 1000,
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

export const CONSTANTS = {
  POST,
  USER,
};

export enum FeedType {
  TRENDING = "TRENDING",
  FRESH = "FRESH",
  SUBSCRIBED = "SUBSCRIBED",
}
