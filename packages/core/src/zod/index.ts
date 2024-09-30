import type { Prisma } from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(["ReadUncommitted","ReadCommitted","RepeatableRead","Serializable"]);

export const NotificationScalarFieldEnumSchema = z.enum(["id","createdAt","updatedAt","type","read","profileId"]);

export const PostScalarFieldEnumSchema = z.enum(["id","createdAt","updatedAt","postType","text","imageUrl","videoUrl","audioUrl","isFlagged","flagReason","commentCount","likeCount","viewCount","profileId"]);

export const CommentScalarFieldEnumSchema = z.enum(["id","createdAt","updatedAt","text","postId","profileId"]);

export const LikeScalarFieldEnumSchema = z.enum(["id","postId","profileId"]);

export const BookmarkScalarFieldEnumSchema = z.enum(["id","postId","profileId"]);

export const ProfileScalarFieldEnumSchema = z.enum(["id","createdAt","updatedAt","email","username","displayName","bio","avatarUrl","link","profileViews","nextPostAllowedAt","bookmarksVisibility","isPrivate"]);

export const SortOrderSchema = z.enum(["asc","desc"]);

export const QueryModeSchema = z.enum(["default","insensitive"]);

export const NullsOrderSchema = z.enum(["first","last"]);

export const PostTypeSchema = z.enum(["TEXT","IMAGE","VIDEO","AUDIO"]);

export type PostTypeType = `${z.infer<typeof PostTypeSchema>}`

export const BookmarkVisibilitySchema = z.enum(["PRIVATE","PUBLIC"]);

export type BookmarkVisibilityType = `${z.infer<typeof BookmarkVisibilitySchema>}`


/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// NOTIFICATION
//------------------------------------------------------

export const NotificationIncludeSchema: z.ZodType<Prisma.NotificationInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

export const NotificationArgsSchema: z.ZodType<Prisma.NotificationDefaultArgs> = z.object({
  select: z.lazy(() => NotificationSelectSchema).optional(),
  include: z.lazy(() => NotificationIncludeSchema).optional(),
}).strict();

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  read: z.boolean().optional(),
  profileId: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = z.object({
  bookmarks: z.boolean().optional(),
  comments: z.boolean().optional(),
  likes: z.boolean().optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  postType: z.boolean().optional(),
  text: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  videoUrl: z.boolean().optional(),
  audioUrl: z.boolean().optional(),
  isFlagged: z.boolean().optional(),
  flagReason: z.boolean().optional(),
  commentCount: z.boolean().optional(),
  likeCount: z.boolean().optional(),
  viewCount: z.boolean().optional(),
  profileId: z.boolean().optional(),
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict();

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  text: z.boolean().optional(),
  postId: z.boolean().optional(),
  profileId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

// LIKE
//------------------------------------------------------

export const LikeIncludeSchema: z.ZodType<Prisma.LikeInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

export const LikeArgsSchema: z.ZodType<Prisma.LikeDefaultArgs> = z.object({
  select: z.lazy(() => LikeSelectSchema).optional(),
  include: z.lazy(() => LikeIncludeSchema).optional(),
}).strict();

export const LikeSelectSchema: z.ZodType<Prisma.LikeSelect> = z.object({
  id: z.boolean().optional(),
  postId: z.boolean().optional(),
  profileId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

// BOOKMARK
//------------------------------------------------------

export const BookmarkIncludeSchema: z.ZodType<Prisma.BookmarkInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

export const BookmarkArgsSchema: z.ZodType<Prisma.BookmarkDefaultArgs> = z.object({
  select: z.lazy(() => BookmarkSelectSchema).optional(),
  include: z.lazy(() => BookmarkIncludeSchema).optional(),
}).strict();

export const BookmarkSelectSchema: z.ZodType<Prisma.BookmarkSelect> = z.object({
  id: z.boolean().optional(),
  postId: z.boolean().optional(),
  profileId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict();

// PROFILE
//------------------------------------------------------

export const ProfileIncludeSchema: z.ZodType<Prisma.ProfileInclude> = z.object({
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ProfileArgsSchema: z.ZodType<Prisma.ProfileDefaultArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict();

export const ProfileCountOutputTypeArgsSchema: z.ZodType<Prisma.ProfileCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProfileCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProfileCountOutputTypeSelectSchema: z.ZodType<Prisma.ProfileCountOutputTypeSelect> = z.object({
  bookmarks: z.boolean().optional(),
  comments: z.boolean().optional(),
  likes: z.boolean().optional(),
  notifications: z.boolean().optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  displayName: z.boolean().optional(),
  bio: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  link: z.boolean().optional(),
  profileViews: z.boolean().optional(),
  nextPostAllowedAt: z.boolean().optional(),
  bookmarksVisibility: z.boolean().optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.union([z.boolean(),z.lazy(() => BookmarkFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => LikeFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProfileCountOutputTypeArgsSchema)]).optional(),
}).strict();


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  read: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  read: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  read: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  postType: z.union([ z.lazy(() => EnumPostTypeFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audioUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isFlagged: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flagReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  commentCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  likeCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  viewCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postType: z.lazy(() => SortOrderSchema).optional(),
  text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  videoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audioUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
  flagReason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  bookmarks: z.lazy(() => BookmarkOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    profileId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    profileId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  profileId: z.string().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  postType: z.union([ z.lazy(() => EnumPostTypeFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().max(4000).min(1) ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  audioUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isFlagged: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flagReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  commentCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  likeCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  viewCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postType: z.lazy(() => SortOrderSchema).optional(),
  text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  videoUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  audioUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
  flagReason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  postType: z.union([ z.lazy(() => EnumPostTypeWithAggregatesFilterSchema),z.lazy(() => PostTypeSchema) ]).optional(),
  text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  videoUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  audioUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isFlagged: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  flagReason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  commentCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  likeCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  viewCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    profileId: z.string(),
    profileId_postId: z.lazy(() => CommentProfileIdPostIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    profileId: z.string(),
  }),
  z.object({
    id: z.string(),
    profileId_postId: z.lazy(() => CommentProfileIdPostIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    profileId: z.string(),
    profileId_postId: z.lazy(() => CommentProfileIdPostIdCompoundUniqueInputSchema),
  }),
  z.object({
    profileId: z.string(),
  }),
  z.object({
    profileId_postId: z.lazy(() => CommentProfileIdPostIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  profileId: z.string().optional(),
  profileId_postId: z.lazy(() => CommentProfileIdPostIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string().max(280).min(1) ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeWhereInputSchema: z.ZodType<Prisma.LikeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const LikeOrderByWithRelationInputSchema: z.ZodType<Prisma.LikeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const LikeWhereUniqueInputSchema: z.ZodType<Prisma.LikeWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    profileId: z.string(),
    profileId_postId: z.lazy(() => LikeProfileIdPostIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    profileId: z.string(),
  }),
  z.object({
    id: z.string(),
    profileId_postId: z.lazy(() => LikeProfileIdPostIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    profileId: z.string(),
    profileId_postId: z.lazy(() => LikeProfileIdPostIdCompoundUniqueInputSchema),
  }),
  z.object({
    profileId: z.string(),
  }),
  z.object({
    profileId_postId: z.lazy(() => LikeProfileIdPostIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  profileId: z.string().optional(),
  profileId_postId: z.lazy(() => LikeProfileIdPostIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeWhereInputSchema),z.lazy(() => LikeWhereInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const LikeOrderByWithAggregationInputSchema: z.ZodType<Prisma.LikeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LikeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LikeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LikeMinOrderByAggregateInputSchema).optional()
}).strict();

export const LikeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LikeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeScalarWhereWithAggregatesInputSchema),z.lazy(() => LikeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BookmarkWhereInputSchema: z.ZodType<Prisma.BookmarkWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const BookmarkOrderByWithRelationInputSchema: z.ZodType<Prisma.BookmarkOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const BookmarkWhereUniqueInputSchema: z.ZodType<Prisma.BookmarkWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    profileId: z.string(),
    profileId_postId: z.lazy(() => BookmarkProfileIdPostIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    profileId: z.string(),
  }),
  z.object({
    id: z.string(),
    profileId_postId: z.lazy(() => BookmarkProfileIdPostIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    profileId: z.string(),
    profileId_postId: z.lazy(() => BookmarkProfileIdPostIdCompoundUniqueInputSchema),
  }),
  z.object({
    profileId: z.string(),
  }),
  z.object({
    profileId_postId: z.lazy(() => BookmarkProfileIdPostIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  profileId: z.string().optional(),
  profileId_postId: z.lazy(() => BookmarkProfileIdPostIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkWhereInputSchema),z.lazy(() => BookmarkWhereInputSchema).array() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const BookmarkOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookmarkOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookmarkCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookmarkMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookmarkMinOrderByAggregateInputSchema).optional()
}).strict();

export const BookmarkScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookmarkScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema),z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema),z.lazy(() => BookmarkScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfileWhereInputSchema: z.ZodType<Prisma.ProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profileViews: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nextPostAllowedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => EnumBookmarkVisibilityFilterSchema),z.lazy(() => BookmarkVisibilitySchema) ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  post: z.union([ z.lazy(() => PostNullableRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profileViews: z.lazy(() => SortOrderSchema).optional(),
  nextPostAllowedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bookmarksVisibility: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  bookmarks: z.lazy(() => BookmarkOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  likes: z.lazy(() => LikeOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string().max(30).min(1)
  }),
  z.object({
    id: z.string(),
    email: z.string().email(),
  }),
  z.object({
    id: z.string(),
    username: z.string().max(30).min(1),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string().email(),
    username: z.string().max(30).min(1),
  }),
  z.object({
    email: z.string().email(),
  }),
  z.object({
    username: z.string().max(30).min(1),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().max(30).min(1).optional(),
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  displayName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().max(30).min(1) ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().max(60).min(1) ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().url() ]).optional().nullable(),
  profileViews: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  nextPostAllowedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => EnumBookmarkVisibilityFilterSchema),z.lazy(() => BookmarkVisibilitySchema) ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  bookmarks: z.lazy(() => BookmarkListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  likes: z.lazy(() => LikeListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  post: z.union([ z.lazy(() => PostNullableRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatarUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  link: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profileViews: z.lazy(() => SortOrderSchema).optional(),
  nextPostAllowedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bookmarksVisibility: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  displayName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatarUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  profileViews: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nextPostAllowedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => EnumBookmarkVisibilityWithAggregatesFilterSchema),z.lazy(() => BookmarkVisibilitySchema) ]).optional(),
  isPrivate: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  read: z.boolean().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutNotificationsInputSchema)
}).strict();

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  read: z.boolean().optional(),
  profileId: z.string()
}).strict();

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional()
}).strict();

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  read: z.boolean().optional(),
  profileId: z.string()
}).strict();

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutPostInputSchema)
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  profileId: z.string(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  profileId: z.string()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  postId: z.string(),
  profileId: z.string()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  postId: z.string(),
  profileId: z.string()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateInputSchema: z.ZodType<Prisma.LikeCreateInput> = z.object({
  id: z.string().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutLikesInputSchema),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateInputSchema: z.ZodType<Prisma.LikeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  postId: z.string(),
  profileId: z.string()
}).strict();

export const LikeUpdateInputSchema: z.ZodType<Prisma.LikeUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutLikesNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeCreateManyInputSchema: z.ZodType<Prisma.LikeCreateManyInput> = z.object({
  id: z.string().optional(),
  postId: z.string(),
  profileId: z.string()
}).strict();

export const LikeUpdateManyMutationInputSchema: z.ZodType<Prisma.LikeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookmarkCreateInputSchema: z.ZodType<Prisma.BookmarkCreateInput> = z.object({
  id: z.string().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutBookmarksInputSchema),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutBookmarksInputSchema)
}).strict();

export const BookmarkUncheckedCreateInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  postId: z.string(),
  profileId: z.string()
}).strict();

export const BookmarkUpdateInputSchema: z.ZodType<Prisma.BookmarkUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict();

export const BookmarkUncheckedUpdateInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookmarkCreateManyInputSchema: z.ZodType<Prisma.BookmarkCreateManyInput> = z.object({
  id: z.string().optional(),
  postId: z.string(),
  profileId: z.string()
}).strict();

export const BookmarkUpdateManyMutationInputSchema: z.ZodType<Prisma.BookmarkUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookmarkUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional()
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ProfileRelationFilterSchema: z.ZodType<Prisma.ProfileRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  read: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  read: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  read: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumPostTypeFilterSchema: z.ZodType<Prisma.EnumPostTypeFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BookmarkListRelationFilterSchema: z.ZodType<Prisma.BookmarkListRelationFilter> = z.object({
  every: z.lazy(() => BookmarkWhereInputSchema).optional(),
  some: z.lazy(() => BookmarkWhereInputSchema).optional(),
  none: z.lazy(() => BookmarkWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const LikeListRelationFilterSchema: z.ZodType<Prisma.LikeListRelationFilter> = z.object({
  every: z.lazy(() => LikeWhereInputSchema).optional(),
  some: z.lazy(() => LikeWhereInputSchema).optional(),
  none: z.lazy(() => LikeWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const BookmarkOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BookmarkOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LikeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postType: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  audioUrl: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
  flagReason: z.lazy(() => SortOrderSchema).optional(),
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z.object({
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postType: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  audioUrl: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
  flagReason: z.lazy(() => SortOrderSchema).optional(),
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  postType: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  videoUrl: z.lazy(() => SortOrderSchema).optional(),
  audioUrl: z.lazy(() => SortOrderSchema).optional(),
  isFlagged: z.lazy(() => SortOrderSchema).optional(),
  flagReason: z.lazy(() => SortOrderSchema).optional(),
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = z.object({
  commentCount: z.lazy(() => SortOrderSchema).optional(),
  likeCount: z.lazy(() => SortOrderSchema).optional(),
  viewCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPostTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPostTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPostTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPostTypeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const CommentProfileIdPostIdCompoundUniqueInputSchema: z.ZodType<Prisma.CommentProfileIdPostIdCompoundUniqueInput> = z.object({
  profileId: z.string(),
  postId: z.string()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeProfileIdPostIdCompoundUniqueInputSchema: z.ZodType<Prisma.LikeProfileIdPostIdCompoundUniqueInput> = z.object({
  profileId: z.string(),
  postId: z.string()
}).strict();

export const LikeCountOrderByAggregateInputSchema: z.ZodType<Prisma.LikeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LikeMinOrderByAggregateInputSchema: z.ZodType<Prisma.LikeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookmarkProfileIdPostIdCompoundUniqueInputSchema: z.ZodType<Prisma.BookmarkProfileIdPostIdCompoundUniqueInput> = z.object({
  profileId: z.string(),
  postId: z.string()
}).strict();

export const BookmarkCountOrderByAggregateInputSchema: z.ZodType<Prisma.BookmarkCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookmarkMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BookmarkMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookmarkMinOrderByAggregateInputSchema: z.ZodType<Prisma.BookmarkMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumBookmarkVisibilityFilterSchema: z.ZodType<Prisma.EnumBookmarkVisibilityFilter> = z.object({
  equals: z.lazy(() => BookmarkVisibilitySchema).optional(),
  in: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  notIn: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  not: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => NestedEnumBookmarkVisibilityFilterSchema) ]).optional(),
}).strict();

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> = z.object({
  every: z.lazy(() => NotificationWhereInputSchema).optional(),
  some: z.lazy(() => NotificationWhereInputSchema).optional(),
  none: z.lazy(() => NotificationWhereInputSchema).optional()
}).strict();

export const PostNullableRelationFilterSchema: z.ZodType<Prisma.PostNullableRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PostWhereInputSchema).optional().nullable()
}).strict();

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  profileViews: z.lazy(() => SortOrderSchema).optional(),
  nextPostAllowedAt: z.lazy(() => SortOrderSchema).optional(),
  bookmarksVisibility: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileAvgOrderByAggregateInput> = z.object({
  profileViews: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  profileViews: z.lazy(() => SortOrderSchema).optional(),
  nextPostAllowedAt: z.lazy(() => SortOrderSchema).optional(),
  bookmarksVisibility: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  displayName: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  avatarUrl: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  profileViews: z.lazy(() => SortOrderSchema).optional(),
  nextPostAllowedAt: z.lazy(() => SortOrderSchema).optional(),
  bookmarksVisibility: z.lazy(() => SortOrderSchema).optional(),
  isPrivate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileSumOrderByAggregateInput> = z.object({
  profileViews: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumBookmarkVisibilityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBookmarkVisibilityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookmarkVisibilitySchema).optional(),
  in: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  notIn: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  not: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => NestedEnumBookmarkVisibilityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookmarkVisibilityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookmarkVisibilityFilterSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutNotificationsInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ProfileUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutNotificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutNotificationsInputSchema),z.lazy(() => ProfileUpdateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
}).strict();

export const BookmarkCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.BookmarkCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkCreateWithoutPostInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutPostInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutPostInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const BookmarkUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkCreateWithoutPostInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumPostTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPostTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PostTypeSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BookmarkUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkCreateWithoutPostInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileUpdateOneRequiredWithoutPostNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutPostInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutPostInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutPostInputSchema),z.lazy(() => ProfileUpdateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPostInputSchema) ]).optional(),
}).strict();

export const BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkCreateWithoutPostInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentCreateWithoutPostInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeCreateWithoutPostInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema),z.lazy(() => LikeCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => ProfileUpdateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => PostUpdateWithoutLikesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => ProfileUpdateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutBookmarksInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutBookmarksInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutBookmarksInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutBookmarksNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutBookmarksNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutBookmarksInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutBookmarksInputSchema),z.lazy(() => PostUpdateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedUpdateWithoutBookmarksInputSchema) ]).optional(),
}).strict();

export const ProfileUpdateOneRequiredWithoutBookmarksNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutBookmarksNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutBookmarksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutBookmarksInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutBookmarksInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutBookmarksInputSchema),z.lazy(() => ProfileUpdateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutBookmarksInputSchema) ]).optional(),
}).strict();

export const BookmarkCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProfileInputSchema),z.lazy(() => BookmarkCreateWithoutProfileInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutProfileInputSchema),z.lazy(() => CommentCreateWithoutProfileInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema),z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.LikeCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutProfileInputSchema),z.lazy(() => LikeCreateWithoutProfileInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema),z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutProfileInputSchema),z.lazy(() => NotificationCreateWithoutProfileInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutProfileInputSchema),z.lazy(() => PostUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const BookmarkUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProfileInputSchema),z.lazy(() => BookmarkCreateWithoutProfileInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutProfileInputSchema),z.lazy(() => CommentCreateWithoutProfileInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema),z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.LikeUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutProfileInputSchema),z.lazy(() => LikeCreateWithoutProfileInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema),z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NotificationUncheckedCreateNestedManyWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutProfileInputSchema),z.lazy(() => NotificationCreateWithoutProfileInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyProfileInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutProfileInputSchema),z.lazy(() => PostUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EnumBookmarkVisibilityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBookmarkVisibilityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BookmarkVisibilitySchema).optional()
}).strict();

export const BookmarkUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProfileInputSchema),z.lazy(() => BookmarkCreateWithoutProfileInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutProfileInputSchema),z.lazy(() => CommentCreateWithoutProfileInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema),z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.LikeUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutProfileInputSchema),z.lazy(() => LikeCreateWithoutProfileInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema),z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NotificationUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutProfileInputSchema),z.lazy(() => NotificationCreateWithoutProfileInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.PostUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutProfileInputSchema),z.lazy(() => PostUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => PostUpdateWithoutProfileInputSchema),z.lazy(() => PostUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const BookmarkUncheckedUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProfileInputSchema),z.lazy(() => BookmarkCreateWithoutProfileInputSchema).array(),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema),z.lazy(() => BookmarkCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => BookmarkUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookmarkCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookmarkWhereUniqueInputSchema),z.lazy(() => BookmarkWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => BookmarkUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookmarkUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => BookmarkUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutProfileInputSchema),z.lazy(() => CommentCreateWithoutProfileInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema),z.lazy(() => CommentCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => LikeCreateWithoutProfileInputSchema),z.lazy(() => LikeCreateWithoutProfileInputSchema).array(),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema),z.lazy(() => LikeCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LikeUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => LikeUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LikeCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LikeWhereUniqueInputSchema),z.lazy(() => LikeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LikeUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => LikeUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LikeUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => LikeUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyWithoutProfileNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutProfileInputSchema),z.lazy(() => NotificationCreateWithoutProfileInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutProfileInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyProfileInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutProfileInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutProfileInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutProfileInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutProfileInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutProfileInputSchema),z.lazy(() => PostUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => PostUpdateWithoutProfileInputSchema),z.lazy(() => PostUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumPostTypeFilterSchema: z.ZodType<Prisma.NestedEnumPostTypeFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumPostTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPostTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PostTypeSchema).optional(),
  in: z.lazy(() => PostTypeSchema).array().optional(),
  notIn: z.lazy(() => PostTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => NestedEnumPostTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPostTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPostTypeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumBookmarkVisibilityFilterSchema: z.ZodType<Prisma.NestedEnumBookmarkVisibilityFilter> = z.object({
  equals: z.lazy(() => BookmarkVisibilitySchema).optional(),
  in: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  notIn: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  not: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => NestedEnumBookmarkVisibilityFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumBookmarkVisibilityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBookmarkVisibilityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookmarkVisibilitySchema).optional(),
  in: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  notIn: z.lazy(() => BookmarkVisibilitySchema).array().optional(),
  not: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => NestedEnumBookmarkVisibilityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookmarkVisibilityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookmarkVisibilityFilterSchema).optional()
}).strict();

export const ProfileCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileCreateWithoutNotificationsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutNotificationsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutNotificationsInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutNotificationsInputSchema) ]),
}).strict();

export const ProfileUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutNotificationsInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutNotificationsInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutNotificationsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutNotificationsInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const BookmarkCreateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutBookmarksInputSchema)
}).strict();

export const BookmarkUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  profileId: z.string()
}).strict();

export const BookmarkCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.BookmarkCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const BookmarkCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.BookmarkCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookmarkCreateManyPostInputSchema),z.lazy(() => BookmarkCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  profileId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyPostInputSchema),z.lazy(() => CommentCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikeCreateWithoutPostInputSchema: z.ZodType<Prisma.LikeCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  profileId: z.string()
}).strict();

export const LikeCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LikeCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeCreateManyPostInputSchema),z.lazy(() => LikeCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileCreateWithoutPostInputSchema: z.ZodType<Prisma.ProfileCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const BookmarkUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookmarkUpdateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const BookmarkUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateWithoutPostInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const BookmarkUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => BookmarkScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateManyMutationInputSchema),z.lazy(() => BookmarkUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const BookmarkScalarWhereInputSchema: z.ZodType<Prisma.BookmarkScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookmarkScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookmarkScalarWhereInputSchema),z.lazy(() => BookmarkScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutPostInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutPostInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const LikeUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeUpdateWithoutPostInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => LikeCreateWithoutPostInputSchema),z.lazy(() => LikeUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const LikeUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateWithoutPostInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const LikeUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => LikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateManyMutationInputSchema),z.lazy(() => LikeUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const LikeScalarWhereInputSchema: z.ZodType<Prisma.LikeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LikeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LikeScalarWhereInputSchema),z.lazy(() => LikeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfileUpsertWithoutPostInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutPostInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutPostInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutPostInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutPostInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutPostInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutProfileNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutPostInputSchema)
}).strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  profileId: z.string(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const ProfileCreateWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const ProfileUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutCommentsInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutPostInputSchema)
}).strict();

export const PostUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  profileId: z.string(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const ProfileCreateWithoutLikesInputSchema: z.ZodType<Prisma.ProfileCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const PostUpsertWithoutLikesInputSchema: z.ZodType<Prisma.PostUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutLikesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutLikesInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutLikesInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const PostUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const ProfileUpsertWithoutLikesInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutLikesInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutLikesInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.PostCreateWithoutBookmarksInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutPostInputSchema)
}).strict();

export const PostUncheckedCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutBookmarksInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  profileId: z.string(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutBookmarksInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutBookmarksInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]),
}).strict();

export const ProfileCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileCreateWithoutBookmarksInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutBookmarksInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  email: z.string().email(),
  username: z.string().max(30).min(1),
  displayName: z.string().max(30).min(1).optional().nullable(),
  bio: z.string().max(60).min(1).optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  profileViews: z.number().int().optional(),
  nextPostAllowedAt: z.coerce.date().optional().nullable(),
  bookmarksVisibility: z.lazy(() => BookmarkVisibilitySchema).optional(),
  isPrivate: z.boolean().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutProfileInputSchema).optional(),
  post: z.lazy(() => PostUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutBookmarksInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutBookmarksInputSchema) ]),
}).strict();

export const PostUpsertWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUpsertWithoutBookmarksInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedUpdateWithoutBookmarksInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedCreateWithoutBookmarksInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutBookmarksInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutBookmarksInputSchema),z.lazy(() => PostUncheckedUpdateWithoutBookmarksInputSchema) ]),
}).strict();

export const PostUpdateWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUpdateWithoutBookmarksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutBookmarksInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutBookmarksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const ProfileUpsertWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutBookmarksInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutBookmarksInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutBookmarksInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutBookmarksInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutBookmarksInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutBookmarksInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutBookmarksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutBookmarksInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutBookmarksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string().max(30).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  displayName: z.union([ z.string().max(30).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string().max(60).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatarUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  link: z.union([ z.string().url(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileViews: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nextPostAllowedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookmarksVisibility: z.union([ z.lazy(() => BookmarkVisibilitySchema),z.lazy(() => EnumBookmarkVisibilityFieldUpdateOperationsInputSchema) ]).optional(),
  isPrivate: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutProfileNestedInputSchema).optional(),
  post: z.lazy(() => PostUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const BookmarkCreateWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutBookmarksInputSchema)
}).strict();

export const BookmarkUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  postId: z.string()
}).strict();

export const BookmarkCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const BookmarkCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.BookmarkCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookmarkCreateManyProfileInputSchema),z.lazy(() => BookmarkCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutProfileInputSchema: z.ZodType<Prisma.CommentCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  postId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const CommentCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyProfileInputSchema),z.lazy(() => CommentCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LikeCreateWithoutProfileInputSchema: z.ZodType<Prisma.LikeCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const LikeUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.LikeUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  postId: z.string()
}).strict();

export const LikeCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.LikeCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LikeCreateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const LikeCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.LikeCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LikeCreateManyProfileInputSchema),z.lazy(() => LikeCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NotificationCreateWithoutProfileInputSchema: z.ZodType<Prisma.NotificationCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  read: z.boolean().optional()
}).strict();

export const NotificationUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  read: z.boolean().optional()
}).strict();

export const NotificationCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const NotificationCreateManyProfileInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyProfileInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManyProfileInputSchema),z.lazy(() => NotificationCreateManyProfileInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostCreateWithoutProfileInputSchema: z.ZodType<Prisma.PostCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  bookmarks: z.lazy(() => BookmarkCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  postType: z.lazy(() => PostTypeSchema),
  text: z.string().max(4000).min(1).optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  isFlagged: z.boolean().optional(),
  flagReason: z.string().optional().nullable(),
  commentCount: z.number().int().optional(),
  likeCount: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutProfileInputSchema),z.lazy(() => PostUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const BookmarkUpsertWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUpsertWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookmarkUpdateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => BookmarkCreateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const BookmarkUpdateWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUpdateWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => BookmarkWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateWithoutProfileInputSchema),z.lazy(() => BookmarkUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const BookmarkUpdateManyWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUpdateManyWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => BookmarkScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookmarkUpdateManyMutationInputSchema),z.lazy(() => BookmarkUncheckedUpdateManyWithoutProfileInputSchema) ]),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutProfileInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutProfileInputSchema) ]),
}).strict();

export const LikeUpsertWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.LikeUpsertWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LikeUpdateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => LikeCreateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const LikeUpdateWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.LikeUpdateWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => LikeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateWithoutProfileInputSchema),z.lazy(() => LikeUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const LikeUpdateManyWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.LikeUpdateManyWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => LikeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LikeUpdateManyMutationInputSchema),z.lazy(() => LikeUncheckedUpdateManyWithoutProfileInputSchema) ]),
}).strict();

export const NotificationUpsertWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const NotificationUpdateWithWhereUniqueWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutProfileInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutProfileInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const NotificationUpdateManyWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema),z.lazy(() => NotificationUncheckedUpdateManyWithoutProfileInputSchema) ]),
}).strict();

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  profileId: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const PostUpsertWithoutProfileInputSchema: z.ZodType<Prisma.PostUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutProfileInputSchema),z.lazy(() => PostUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutProfileInputSchema),z.lazy(() => PostUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutProfileInputSchema),z.lazy(() => PostUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const PostUpdateWithoutProfileInputSchema: z.ZodType<Prisma.PostUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  postType: z.union([ z.lazy(() => PostTypeSchema),z.lazy(() => EnumPostTypeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(4000).min(1),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  videoUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  audioUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isFlagged: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  flagReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  commentCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  likeCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  viewCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bookmarks: z.lazy(() => BookmarkUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  likes: z.lazy(() => LikeUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const BookmarkCreateManyPostInputSchema: z.ZodType<Prisma.BookmarkCreateManyPostInput> = z.object({
  id: z.string().optional(),
  profileId: z.string()
}).strict();

export const CommentCreateManyPostInputSchema: z.ZodType<Prisma.CommentCreateManyPostInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  profileId: z.string()
}).strict();

export const LikeCreateManyPostInputSchema: z.ZodType<Prisma.LikeCreateManyPostInput> = z.object({
  id: z.string().optional(),
  profileId: z.string()
}).strict();

export const BookmarkUpdateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict();

export const BookmarkUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookmarkUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUpdateWithoutPostInputSchema: z.ZodType<Prisma.LikeUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookmarkCreateManyProfileInputSchema: z.ZodType<Prisma.BookmarkCreateManyProfileInput> = z.object({
  id: z.string().optional(),
  postId: z.string()
}).strict();

export const CommentCreateManyProfileInputSchema: z.ZodType<Prisma.CommentCreateManyProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().max(280).min(1),
  postId: z.string()
}).strict();

export const LikeCreateManyProfileInputSchema: z.ZodType<Prisma.LikeCreateManyProfileInput> = z.object({
  id: z.string().optional(),
  postId: z.string()
}).strict();

export const NotificationCreateManyProfileInputSchema: z.ZodType<Prisma.NotificationCreateManyProfileInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.string(),
  read: z.boolean().optional()
}).strict();

export const BookmarkUpdateWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutBookmarksNestedInputSchema).optional()
}).strict();

export const BookmarkUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookmarkUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.BookmarkUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutProfileInputSchema: z.ZodType<Prisma.CommentUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string().max(280).min(1),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUpdateWithoutProfileInputSchema: z.ZodType<Prisma.LikeUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const LikeUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LikeUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.LikeUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUpdateWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NotificationUncheckedUpdateManyWithoutProfileInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const NotificationFindFirstArgsSchema: z.ZodType<Prisma.NotificationFindFirstArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NotificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NotificationFindManyArgsSchema: z.ZodType<Prisma.NotificationFindManyArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NotificationAggregateArgsSchema: z.ZodType<Prisma.NotificationAggregateArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NotificationGroupByArgsSchema: z.ZodType<Prisma.NotificationGroupByArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithAggregationInputSchema.array(),NotificationOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationScalarFieldEnumSchema.array(),
  having: NotificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NotificationFindUniqueArgsSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const NotificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const LikeFindFirstArgsSchema: z.ZodType<Prisma.LikeFindFirstArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LikeFindFirstOrThrowArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeFindManyArgsSchema: z.ZodType<Prisma.LikeFindManyArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LikeScalarFieldEnumSchema,LikeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LikeAggregateArgsSchema: z.ZodType<Prisma.LikeAggregateArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithRelationInputSchema.array(),LikeOrderByWithRelationInputSchema ]).optional(),
  cursor: LikeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeGroupByArgsSchema: z.ZodType<Prisma.LikeGroupByArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
  orderBy: z.union([ LikeOrderByWithAggregationInputSchema.array(),LikeOrderByWithAggregationInputSchema ]).optional(),
  by: LikeScalarFieldEnumSchema.array(),
  having: LikeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LikeFindUniqueArgsSchema: z.ZodType<Prisma.LikeFindUniqueArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LikeFindUniqueOrThrowArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const BookmarkFindFirstArgsSchema: z.ZodType<Prisma.BookmarkFindFirstArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithRelationInputSchema.array(),BookmarkOrderByWithRelationInputSchema ]).optional(),
  cursor: BookmarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookmarkScalarFieldEnumSchema,BookmarkScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookmarkFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BookmarkFindFirstOrThrowArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithRelationInputSchema.array(),BookmarkOrderByWithRelationInputSchema ]).optional(),
  cursor: BookmarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookmarkScalarFieldEnumSchema,BookmarkScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookmarkFindManyArgsSchema: z.ZodType<Prisma.BookmarkFindManyArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithRelationInputSchema.array(),BookmarkOrderByWithRelationInputSchema ]).optional(),
  cursor: BookmarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookmarkScalarFieldEnumSchema,BookmarkScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookmarkAggregateArgsSchema: z.ZodType<Prisma.BookmarkAggregateArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithRelationInputSchema.array(),BookmarkOrderByWithRelationInputSchema ]).optional(),
  cursor: BookmarkWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookmarkGroupByArgsSchema: z.ZodType<Prisma.BookmarkGroupByArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
  orderBy: z.union([ BookmarkOrderByWithAggregationInputSchema.array(),BookmarkOrderByWithAggregationInputSchema ]).optional(),
  by: BookmarkScalarFieldEnumSchema.array(),
  having: BookmarkScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookmarkFindUniqueArgsSchema: z.ZodType<Prisma.BookmarkFindUniqueArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereUniqueInputSchema,
}).strict() ;

export const BookmarkFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BookmarkFindUniqueOrThrowArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindFirstOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindManyArgsSchema: z.ZodType<Prisma.ProfileFindManyArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileAggregateArgsSchema: z.ZodType<Prisma.ProfileAggregateArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileGroupByArgsSchema: z.ZodType<Prisma.ProfileGroupByArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithAggregationInputSchema.array(),ProfileOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileFindUniqueArgsSchema: z.ZodType<Prisma.ProfileFindUniqueArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const NotificationCreateArgsSchema: z.ZodType<Prisma.NotificationCreateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationCreateInputSchema,NotificationUncheckedCreateInputSchema ]),
}).strict() ;

export const NotificationUpsertArgsSchema: z.ZodType<Prisma.NotificationUpsertArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
  create: z.union([ NotificationCreateInputSchema,NotificationUncheckedCreateInputSchema ]),
  update: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const NotificationCreateManyArgsSchema: z.ZodType<Prisma.NotificationCreateManyArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema,NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NotificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema,NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NotificationDeleteArgsSchema: z.ZodType<Prisma.NotificationDeleteArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
  where: NotificationWhereUniqueInputSchema,
}).strict() ;

export const NotificationUpdateManyArgsSchema: z.ZodType<Prisma.NotificationUpdateManyArgs> = z.object({
  data: z.union([ NotificationUpdateManyMutationInputSchema,NotificationUncheckedUpdateManyInputSchema ]),
  where: NotificationWhereInputSchema.optional(),
}).strict() ;

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
}).strict() ;

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const LikeCreateArgsSchema: z.ZodType<Prisma.LikeCreateArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  data: z.union([ LikeCreateInputSchema,LikeUncheckedCreateInputSchema ]),
}).strict() ;

export const LikeUpsertArgsSchema: z.ZodType<Prisma.LikeUpsertArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
  create: z.union([ LikeCreateInputSchema,LikeUncheckedCreateInputSchema ]),
  update: z.union([ LikeUpdateInputSchema,LikeUncheckedUpdateInputSchema ]),
}).strict() ;

export const LikeCreateManyArgsSchema: z.ZodType<Prisma.LikeCreateManyArgs> = z.object({
  data: z.union([ LikeCreateManyInputSchema,LikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LikeCreateManyAndReturnArgs> = z.object({
  data: z.union([ LikeCreateManyInputSchema,LikeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LikeDeleteArgsSchema: z.ZodType<Prisma.LikeDeleteArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeUpdateArgsSchema: z.ZodType<Prisma.LikeUpdateArgs> = z.object({
  select: LikeSelectSchema.optional(),
  include: LikeIncludeSchema.optional(),
  data: z.union([ LikeUpdateInputSchema,LikeUncheckedUpdateInputSchema ]),
  where: LikeWhereUniqueInputSchema,
}).strict() ;

export const LikeUpdateManyArgsSchema: z.ZodType<Prisma.LikeUpdateManyArgs> = z.object({
  data: z.union([ LikeUpdateManyMutationInputSchema,LikeUncheckedUpdateManyInputSchema ]),
  where: LikeWhereInputSchema.optional(),
}).strict() ;

export const LikeDeleteManyArgsSchema: z.ZodType<Prisma.LikeDeleteManyArgs> = z.object({
  where: LikeWhereInputSchema.optional(),
}).strict() ;

export const BookmarkCreateArgsSchema: z.ZodType<Prisma.BookmarkCreateArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  data: z.union([ BookmarkCreateInputSchema,BookmarkUncheckedCreateInputSchema ]),
}).strict() ;

export const BookmarkUpsertArgsSchema: z.ZodType<Prisma.BookmarkUpsertArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereUniqueInputSchema,
  create: z.union([ BookmarkCreateInputSchema,BookmarkUncheckedCreateInputSchema ]),
  update: z.union([ BookmarkUpdateInputSchema,BookmarkUncheckedUpdateInputSchema ]),
}).strict() ;

export const BookmarkCreateManyArgsSchema: z.ZodType<Prisma.BookmarkCreateManyArgs> = z.object({
  data: z.union([ BookmarkCreateManyInputSchema,BookmarkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BookmarkCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BookmarkCreateManyAndReturnArgs> = z.object({
  data: z.union([ BookmarkCreateManyInputSchema,BookmarkCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BookmarkDeleteArgsSchema: z.ZodType<Prisma.BookmarkDeleteArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  where: BookmarkWhereUniqueInputSchema,
}).strict() ;

export const BookmarkUpdateArgsSchema: z.ZodType<Prisma.BookmarkUpdateArgs> = z.object({
  select: BookmarkSelectSchema.optional(),
  include: BookmarkIncludeSchema.optional(),
  data: z.union([ BookmarkUpdateInputSchema,BookmarkUncheckedUpdateInputSchema ]),
  where: BookmarkWhereUniqueInputSchema,
}).strict() ;

export const BookmarkUpdateManyArgsSchema: z.ZodType<Prisma.BookmarkUpdateManyArgs> = z.object({
  data: z.union([ BookmarkUpdateManyMutationInputSchema,BookmarkUncheckedUpdateManyInputSchema ]),
  where: BookmarkWhereInputSchema.optional(),
}).strict() ;

export const BookmarkDeleteManyArgsSchema: z.ZodType<Prisma.BookmarkDeleteManyArgs> = z.object({
  where: BookmarkWhereInputSchema.optional(),
}).strict() ;

export const ProfileCreateArgsSchema: z.ZodType<Prisma.ProfileCreateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfileUpsertArgsSchema: z.ZodType<Prisma.ProfileUpsertArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
  create: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
  update: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileDeleteArgsSchema: z.ZodType<Prisma.ProfileDeleteArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateArgsSchema: z.ZodType<Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateManyArgsSchema: z.ZodType<Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
}).strict() ;

export const ProfileDeleteManyArgsSchema: z.ZodType<Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
}).strict() ;