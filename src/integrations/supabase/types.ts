export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          campus_location: string | null;
          college: string | null;
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
          response_rate: number;
          trades_completed: number;
          trust_score: number;
          updated_at: string;
          verified: boolean;
          role: "buyer" | "seller" | "admin";
          current_mode: "buyer" | "seller";
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          campus_location?: string | null;
          college?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
          response_rate?: number;
          trades_completed?: number;
          trust_score?: number;
          updated_at?: string;
          verified?: boolean;
          role?: "buyer" | "seller" | "admin";
          current_mode?: "buyer" | "seller";
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          campus_location?: string | null;
          college?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          response_rate?: number;
          trades_completed?: number;
          trust_score?: number;
          updated_at?: string;
          verified?: boolean;
          role?: "buyer" | "seller" | "admin";
          current_mode?: "buyer" | "seller";
        };
        Relationships: [];
      };
      listings: {
        Row: {
          id: string;
          seller_id: string;
          buyer_id: string | null;
          title: string;
          description: string;
          price: number;
          category: string;
          condition: string;
          images: string[];
          availability_status:
            | "available"
            | "sold"
            | "rented"
            | "pending"
            | "reserved"
            | "pending_approval";
          is_archived: boolean;
          is_active: boolean;
          meetup_location: string | null;
          sold_at: string | null;
          reserved_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id: string;
          buyer_id?: string | null;
          title: string;
          description: string;
          price: number;
          category: string;
          condition: string;
          images: string[];
          availability_status?:
            | "available"
            | "sold"
            | "rented"
            | "pending"
            | "reserved"
            | "pending_approval";
          is_archived?: boolean;
          is_active?: boolean;
          meetup_location?: string | null;
          sold_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          seller_id?: string;
          buyer_id?: string | null;
          title?: string;
          description?: string;
          price?: number;
          category?: string;
          condition?: string;
          images?: string[];
          availability_status?:
            | "available"
            | "sold"
            | "rented"
            | "pending"
            | "reserved"
            | "pending_approval";
          is_archived?: boolean;
          is_active?: boolean;
          meetup_location?: string | null;
          sold_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          listing_id: string;
          reviewer_id: string;
          seller_id: string;
          rating: number;
          comment: string;
          is_verified_purchase: boolean;
          moderation_status: "pending" | "approved" | "flagged";
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          reviewer_id: string;
          seller_id: string;
          rating: number;
          comment: string;
          is_verified_purchase?: boolean;
          moderation_status?: "pending" | "approved" | "flagged";
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          reviewer_id?: string;
          seller_id?: string;
          rating?: number;
          comment?: string;
          is_verified_purchase?: boolean;
          moderation_status?: "pending" | "approved" | "flagged";
          created_at?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          listing_id: string;
          buyer_id: string;
          seller_id: string;
          status: "pending" | "completed" | "cancelled";
          meetup_id: string | null;
          otp_code: string | null;
          amount: number;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          buyer_id: string;
          seller_id: string;
          status?: "pending" | "completed" | "cancelled";
          meetup_id?: string | null;
          otp_code?: string | null;
          amount: number;
          is_verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          buyer_id?: string;
          seller_id?: string;
          status?: "pending" | "completed" | "cancelled";
          meetup_id?: string | null;
          otp_code?: string | null;
          amount?: number;
          is_verified?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      moderation_logs: {
        Row: {
          id: string;
          reporter_id: string | null;
          target_id: string;
          target_type: "listing" | "review" | "user" | "chat";
          reason: string;
          ai_confidence_score: number;
          status: "open" | "resolved" | "dismissed";
          created_at: string;
        };
        Insert: {
          id?: string;
          reporter_id?: string | null;
          target_id: string;
          target_type: "listing" | "review" | "user" | "chat";
          reason: string;
          ai_confidence_score?: number;
          status?: "open" | "resolved" | "dismissed";
          created_at?: string;
        };
        Update: {
          id?: string;
          reporter_id?: string | null;
          target_id?: string;
          target_type?: "listing" | "review" | "user" | "chat";
          reason?: string;
          ai_confidence_score?: number;
          status?: "open" | "resolved" | "dismissed";
          created_at?: string;
        };
        Relationships: [];
      };
      meetup_zones: {
        Row: {
          id: string;
          name: string;
          description: string;
          latitude: number;
          longitude: number;
          is_secure_zone: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          latitude: number;
          longitude: number;
          is_secure_zone?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          latitude?: number;
          longitude?: number;
          is_secure_zone?: boolean;
        };
        Relationships: [];
      };
      listing_requests: {
        Row: {
          id: string;
          listing_id: string;
          buyer_id: string;
          seller_id: string;
          type: "buy" | "rent" | "bid";
          status: "pending" | "accepted" | "rejected" | "negotiating" | "completed";
          amount: number | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          buyer_id: string;
          seller_id: string;
          type: "buy" | "rent" | "bid";
          status?: "pending" | "accepted" | "rejected" | "negotiating" | "completed";
          amount?: number | null;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          buyer_id?: string;
          seller_id?: string;
          type?: "buy" | "rent" | "bid";
          status?: "pending" | "accepted" | "rejected" | "negotiating" | "completed";
          amount?: number | null;
          message?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: "request" | "status_change" | "message" | "system";
          is_read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: "request" | "status_change" | "message" | "system";
          is_read?: boolean;
          link?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: "request" | "status_change" | "message" | "system";
          is_read?: boolean;
          link?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      buyer_reviews: {
        Row: {
          id: string;
          buyer_id: string;
          seller_id: string;
          listing_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          buyer_id: string;
          seller_id: string;
          listing_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          buyer_id?: string;
          seller_id?: string;
          listing_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      detect_college: { Args: { _email: string }; Returns: string };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "moderator" | "student";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "student"],
    },
  },
} as const;
