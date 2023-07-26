export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          display_name: string | null
          id: number
          rating: number | null
          salon_id: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: number
          rating?: number | null
          salon_id?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: number
          rating?: number | null
          salon_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_salon_id_fkey"
            columns: ["salon_id"]
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      employees: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: number
          last_name: string | null
          position: string | null
          salon_id: number | null
          schedule: Json | null
          services: string[] | null
          thumbnail: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          position?: string | null
          salon_id?: number | null
          schedule?: Json | null
          services?: string[] | null
          thumbnail?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          position?: string | null
          salon_id?: number | null
          schedule?: Json | null
          services?: string[] | null
          thumbnail?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_salon_id_fkey"
            columns: ["salon_id"]
            referencedRelation: "salons"
            referencedColumns: ["id"]
          }
        ]
      }
      salons: {
        Row: {
          address: Json | null
          created_at: string | null
          description: string | null
          gallery: string[] | null
          id: number
          name: string | null
          opening_times: Json | null
          services: Json | null
          social_media: Json | null
          team_description: string | null
          thumbnail: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          description?: string | null
          gallery?: string[] | null
          id?: number
          name?: string | null
          opening_times?: Json | null
          services?: Json | null
          social_media?: Json | null
          team_description?: string | null
          thumbnail?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          description?: string | null
          gallery?: string[] | null
          id?: number
          name?: string | null
          opening_times?: Json | null
          services?: Json | null
          social_media?: Json | null
          team_description?: string | null
          thumbnail?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
