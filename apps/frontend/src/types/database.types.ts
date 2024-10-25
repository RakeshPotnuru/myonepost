export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      comment_likes: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id: string;
          user_id: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comment_likes_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comment_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          created_at: string;
          id: string;
          like_count: number;
          post_id: string;
          text: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          like_count?: number;
          post_id: string;
          text: string;
          updated_at: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          like_count?: number;
          post_id?: string;
          text?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_read: boolean;
          type: Database["public"]["Enums"]["NotificationType"];
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id: string;
          is_read?: boolean;
          type: Database["public"]["Enums"]["NotificationType"];
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          type?: Database["public"]["Enums"]["NotificationType"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      post_scores: {
        Row: {
          id: string;
          post_id: string;
          score: number;
          updated_at: string;
        };
        Insert: {
          id: string;
          post_id: string;
          score: number;
          updated_at: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          score?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_scores_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          comment_count: number;
          created_at: string;
          id: string;
          like_count: number;
          media_caption: string | null;
          media_data: Json | null;
          media_url: string | null;
          post_type: Database["public"]["Enums"]["PostType"];
          status: Database["public"]["Enums"]["PostStatus"];
          text: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          comment_count?: number;
          created_at?: string;
          id: string;
          like_count?: number;
          media_caption?: string | null;
          media_data?: Json | null;
          media_url?: string | null;
          post_type: Database["public"]["Enums"]["PostType"];
          status?: Database["public"]["Enums"]["PostStatus"];
          text?: string | null;
          updated_at: string;
          user_id: string;
        };
        Update: {
          comment_count?: number;
          created_at?: string;
          id?: string;
          like_count?: number;
          media_caption?: string | null;
          media_data?: Json | null;
          media_url?: string | null;
          post_type?: Database["public"]["Enums"]["PostType"];
          status?: Database["public"]["Enums"]["PostStatus"];
          text?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      reports: {
        Row: {
          comment_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          post_id: string | null;
          reason: Database["public"]["Enums"]["ReportReason"];
          report_type: Database["public"]["Enums"]["ReportType"];
          reported_by_id: string;
          reported_user_id: string;
          status: Database["public"]["Enums"]["ReportStatus"];
          updated_at: string;
        };
        Insert: {
          comment_id?: string | null;
          created_at?: string;
          description?: string | null;
          id: string;
          post_id?: string | null;
          reason: Database["public"]["Enums"]["ReportReason"];
          report_type: Database["public"]["Enums"]["ReportType"];
          reported_by_id: string;
          reported_user_id: string;
          status?: Database["public"]["Enums"]["ReportStatus"];
          updated_at: string;
        };
        Update: {
          comment_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          post_id?: string | null;
          reason?: Database["public"]["Enums"]["ReportReason"];
          report_type?: Database["public"]["Enums"]["ReportType"];
          reported_by_id?: string;
          reported_user_id?: string;
          status?: Database["public"]["Enums"]["ReportStatus"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "reports_reported_by_id_fkey";
            columns: ["reported_by_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_reported_user_id_fkey";
            columns: ["reported_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscribers: {
        Row: {
          created_at: string;
          id: string;
          subscribed_to_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          subscribed_to_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          subscribed_to_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscribers_subscribed_to_id_fkey";
            columns: ["subscribed_to_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscribers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          email: string;
          id: string;
          is_private: boolean;
          next_post_allowed_at: string | null;
          subscriber_count: number;
          subscription_count: number;
          updated_at: string;
          url: string | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          email: string;
          id: string;
          is_private?: boolean;
          next_post_allowed_at?: string | null;
          subscriber_count?: number;
          subscription_count?: number;
          updated_at: string;
          url?: string | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string;
          id?: string;
          is_private?: boolean;
          next_post_allowed_at?: string | null;
          subscriber_count?: number;
          subscription_count?: number;
          updated_at?: string;
          url?: string | null;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      NotificationType:
        | "NEW_POST_LIKE"
        | "NEW_COMMENT_LIKE"
        | "NEW_COMMENT"
        | "NEW_SUBSCRIBER";
      PostStatus: "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED";
      PostType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
      ReportReason:
        | "INAPPROPRIATE_CONTENT"
        | "HARASSMENT"
        | "SPAM"
        | "FALSE_INFORMATION"
        | "HATE_SPEECH"
        | "VIOLENCE"
        | "COPYRIGHT_VIOLATION"
        | "PRIVACY"
        | "CHILD_EXPLOITATION"
        | "OTHER";
      ReportStatus: "PENDING" | "UNDER_REVIEW" | "RESOLVED" | "DISMISSED";
      ReportType: "USER" | "POST" | "COMMENT";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
