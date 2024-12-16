export class PostCheckEvent {
  userId: string;
  playbackId: string;
  assetId: string;

  constructor(payload: {
    userId: string;
    playbackId: string;
    assetId: string;
  }) {
    this.userId = payload.userId;
    this.playbackId = payload.playbackId;
    this.assetId = payload.assetId;
  }
}
