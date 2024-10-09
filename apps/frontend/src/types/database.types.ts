export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Bookmark: {
        Row: {
          id: string
          postId: string
          profileId: string
        }
        Insert: {
          id: string
          postId: string
          profileId: string
        }
        Update: {
          id?: string
          postId?: string
          profileId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Bookmark_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Bookmark_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
      Comment: {
        Row: {
          createdAt: string
          id: string
          postId: string
          profileId: string
          text: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          postId: string
          profileId: string
          text: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          postId?: string
          profileId?: string
          text?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Comment_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comment_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
      Like: {
        Row: {
          id: string
          postId: string
          profileId: string
        }
        Insert: {
          id: string
          postId: string
          profileId: string
        }
        Update: {
          id?: string
          postId?: string
          profileId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Like_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Like_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
      Notification: {
        Row: {
          createdAt: string
          id: string
          profileId: string
          read: boolean
          type: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          profileId: string
          read?: boolean
          type: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          profileId?: string
          read?: boolean
          type?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Notification_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
      Post: {
        Row: {
          audioUrl: string | null
          commentCount: number
          createdAt: string
          flagReason: string | null
          id: string
          imageUrl: string | null
          isFlagged: boolean
          likeCount: number
          postType: Database["public"]["Enums"]["PostType"]
          profileId: string
          text: string | null
          updatedAt: string
          videoUrl: string | null
          viewCount: number
        }
        Insert: {
          audioUrl?: string | null
          commentCount?: number
          createdAt?: string
          flagReason?: string | null
          id: string
          imageUrl?: string | null
          isFlagged?: boolean
          likeCount?: number
          postType: Database["public"]["Enums"]["PostType"]
          profileId: string
          text?: string | null
          updatedAt: string
          videoUrl?: string | null
          viewCount?: number
        }
        Update: {
          audioUrl?: string | null
          commentCount?: number
          createdAt?: string
          flagReason?: string | null
          id?: string
          imageUrl?: string | null
          isFlagged?: boolean
          likeCount?: number
          postType?: Database["public"]["Enums"]["PostType"]
          profileId?: string
          text?: string | null
          updatedAt?: string
          videoUrl?: string | null
          viewCount?: number
        }
        Relationships: [
          {
            foreignKeyName: "Post_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
      Profile: {
        Row: {
          avatarUrl: string | null
          bio: string | null
          bookmarksVisibility: Database["public"]["Enums"]["BookmarkVisibility"]
          createdAt: string
          displayName: string | null
          email: string
          id: string
          isPrivate: boolean
          link: string | null
          nextPostAllowedAt: string | null
          profileViews: number
          updatedAt: string
          username: string
        }
        Insert: {
          avatarUrl?: string | null
          bio?: string | null
          bookmarksVisibility?: Database["public"]["Enums"]["BookmarkVisibility"]
          createdAt?: string
          displayName?: string | null
          email: string
          id: string
          isPrivate?: boolean
          link?: string | null
          nextPostAllowedAt?: string | null
          profileViews?: number
          updatedAt: string
          username: string
        }
        Update: {
          avatarUrl?: string | null
          bio?: string | null
          bookmarksVisibility?: Database["public"]["Enums"]["BookmarkVisibility"]
          createdAt?: string
          displayName?: string | null
          email?: string
          id?: string
          isPrivate?: boolean
          link?: string | null
          nextPostAllowedAt?: string | null
          profileViews?: number
          updatedAt?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      BookmarkVisibility: "PRIVATE" | "PUBLIC"
      PostType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
