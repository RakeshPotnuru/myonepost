export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type MediaDataType = {
      asset_id: string;
    };
  }
}
