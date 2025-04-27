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
      adoptions: {
        Row: {
          adoption_date: string
          created_at: string
          dog_id: string
          id: string
          notes: string | null
          owner_id: string
        }
        Insert: {
          adoption_date?: string
          created_at?: string
          dog_id: string
          id?: string
          notes?: string | null
          owner_id: string
        }
        Update: {
          adoption_date?: string
          created_at?: string
          dog_id?: string
          id?: string
          notes?: string | null
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adoptions_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "adoptable_dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adoptions_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_characteristics"
            referencedColumns: ["dog_id"]
          },
          {
            foreignKeyName: "adoptions_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adoptions_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adoptions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_matches: {
        Row: {
          created_at: string
          dog_id: string
          id: string
          match_percentage: number
          rank: number
          search_id: string
          was_clicked: boolean
        }
        Insert: {
          created_at?: string
          dog_id: string
          id?: string
          match_percentage: number
          rank: number
          search_id: string
          was_clicked?: boolean
        }
        Update: {
          created_at?: string
          dog_id?: string
          id?: string
          match_percentage?: number
          rank?: number
          search_id?: string
          was_clicked?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "ai_matches_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "adoptable_dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_matches_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_characteristics"
            referencedColumns: ["dog_id"]
          },
          {
            foreignKeyName: "ai_matches_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_matches_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_matches_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "ai_searches"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_searches: {
        Row: {
          created_at: string
          id: string
          prompt: string
          search_vector: unknown | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          prompt: string
          search_vector?: unknown | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          prompt?: string
          search_vector?: unknown | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      breeds: {
        Row: {
          coat_type: string
          created_at: string
          description: string | null
          energy_level: number
          id: string
          name: string
          shedding_level: number
          size: string
          sociability: number
          trainability: number
        }
        Insert: {
          coat_type: string
          created_at?: string
          description?: string | null
          energy_level: number
          id?: string
          name: string
          shedding_level: number
          size: string
          sociability: number
          trainability: number
        }
        Update: {
          coat_type?: string
          created_at?: string
          description?: string | null
          energy_level?: number
          id?: string
          name?: string
          shedding_level?: number
          size?: string
          sociability?: number
          trainability?: number
        }
        Relationships: []
      }
      dog_images: {
        Row: {
          created_at: string
          description: string | null
          dog_id: string
          id: string
          image_path: string
          is_primary: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          dog_id: string
          id?: string
          image_path: string
          is_primary?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          dog_id?: string
          id?: string
          image_path?: string
          is_primary?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "dog_images_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "adoptable_dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_images_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_characteristics"
            referencedColumns: ["dog_id"]
          },
          {
            foreignKeyName: "dog_images_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_images_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      dog_tags: {
        Row: {
          created_at: string
          dog_id: string
          id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          dog_id: string
          id?: string
          tag_id: string
        }
        Update: {
          created_at?: string
          dog_id?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dog_tags_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "adoptable_dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_tags_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_characteristics"
            referencedColumns: ["dog_id"]
          },
          {
            foreignKeyName: "dog_tags_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dog_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_tags_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dog_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      dogs: {
        Row: {
          approximate_age: string | null
          breed_id: string
          color: string | null
          created_at: string
          description: string | null
          gender: string | null
          id: string
          mixed_breed: boolean
          name: string
          shelter_id: string
          status: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          approximate_age?: string | null
          breed_id: string
          color?: string | null
          created_at?: string
          description?: string | null
          gender?: string | null
          id?: string
          mixed_breed?: boolean
          name: string
          shelter_id: string
          status?: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          approximate_age?: string | null
          breed_id?: string
          color?: string | null
          created_at?: string
          description?: string | null
          gender?: string | null
          id?: string
          mixed_breed?: boolean
          name?: string
          shelter_id?: string
          status?: string
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dogs_breed_id_fkey"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "breeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelter_stats"
            referencedColumns: ["shelter_id"]
          },
          {
            foreignKeyName: "dogs_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      shelter_employees: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          shelter_id: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          shelter_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          shelter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shelter_employees_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shelter_employees_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelter_stats"
            referencedColumns: ["shelter_id"]
          },
          {
            foreignKeyName: "shelter_employees_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      shelters: {
        Row: {
          active: boolean
          address: string
          city: string
          created_at: string
          description: string | null
          email: string
          id: string
          name: string
          phone: string
          postal_code: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          address: string
          city: string
          created_at?: string
          description?: string | null
          email: string
          id?: string
          name: string
          phone: string
          postal_code: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          address?: string
          city?: string
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          postal_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      adoptable_dogs: {
        Row: {
          approximate_age: string | null
          breed_id: string | null
          breed_name: string | null
          color: string | null
          created_at: string | null
          description: string | null
          gender: string | null
          id: string | null
          mixed_breed: boolean | null
          name: string | null
          shelter_city: string | null
          shelter_id: string | null
          shelter_name: string | null
          status: string | null
          updated_at: string | null
          weight: number | null
        }
        Relationships: [
          {
            foreignKeyName: "dogs_breed_id_fkey"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "breeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dogs_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelter_stats"
            referencedColumns: ["shelter_id"]
          },
          {
            foreignKeyName: "dogs_shelter_id_fkey"
            columns: ["shelter_id"]
            isOneToOne: false
            referencedRelation: "shelters"
            referencedColumns: ["id"]
          },
        ]
      }
      dog_characteristics: {
        Row: {
          characteristics: string | null
          dog_id: string | null
          dog_name: string | null
        }
        Relationships: []
      }
      dog_details: {
        Row: {
          approximate_age: string | null
          breed_name: string | null
          breed_size: string | null
          coat_type: string | null
          color: string | null
          description: string | null
          energy_level: number | null
          gender: string | null
          id: string | null
          mixed_breed: boolean | null
          name: string | null
          primary_image_path: string | null
          shelter_city: string | null
          shelter_name: string | null
          status: string | null
          weight: number | null
        }
        Relationships: []
      }
      shelter_stats: {
        Row: {
          adopted_dogs: number | null
          available_dogs: number | null
          shelter_city: string | null
          shelter_id: string | null
          shelter_name: string | null
          total_dogs: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
