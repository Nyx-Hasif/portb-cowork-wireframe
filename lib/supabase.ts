import { createClient } from '@supabase/supabase-js'
import type { Session } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// TypeScript interfaces for authentication
export interface User {
    id: string
    email?: string
    user_metadata?: {
        name?: string
        role?: string
    }
    created_at: string
    last_sign_in_at?: string
}

export interface AuthSession {
    access_token: string
    refresh_token: string
    expires_in: number
    user: User
}

// Authentication helper functions
export const auth = {
    // Sign in with email and password
    signIn: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    },

    // Sign out current user
    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    // Get current user session
    getSession: async () => {
        const { data, error } = await supabase.auth.getSession()
        return { data, error }
    },

    // Get current user
    getUser: async () => {
        const { data, error } = await supabase.auth.getUser()
        return { data, error }
    },

    // Listen to auth state changes
    onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
        return supabase.auth.onAuthStateChange(callback)
    }
}

// Helper function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
    const { data } = await auth.getSession()
    return !!data.session
}

// Helper function to get current user info
export const getCurrentUser = async (): Promise<User | null> => {
    const { data } = await auth.getUser()
    return data.user as User | null
}