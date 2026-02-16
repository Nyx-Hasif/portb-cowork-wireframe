// lib/database.ts

import { supabase } from './supabase'

// ========================================
// 🖼️ STORAGE FUNCTIONS
// ========================================

// Upload image to Supabase Storage
export async function uploadImage(
    file: File,
    folder: string = 'events'
): Promise<string> {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`

    // Upload file
    const {  error } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        console.error('Error uploading image:', error)
        throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)

    return publicUrl
}

// Delete image from Supabase Storage
export async function deleteImageFromStorage(imageUrl: string): Promise<boolean> {
    try {
        // Extract file path from URL
        const url = new URL(imageUrl)
        const pathParts = url.pathname.split('/storage/v1/object/public/images/')

        if (pathParts.length < 2) {
            console.log('Not a storage URL, skipping delete')
            return true
        }

        const filePath = pathParts[1]

        const { error } = await supabase.storage
            .from('images')
            .remove([filePath])

        if (error) {
            console.error('Error deleting image from storage:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error parsing image URL:', error)
        return false
    }
}

// ========================================
// UPCOMING EVENTS - CRUD
// ========================================

// GET all upcoming events
export async function getUpcomingEvents() {
    const { data, error } = await supabase
        .from('upcoming_events')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching upcoming events:', error)
        return []
    }

    return data
}

// GET all upcoming events (alias)
export async function getAllUpcomingEvents() {
    return getUpcomingEvents()
}

// GET featured upcoming events (for homepage)
export async function getFeaturedEvents(limit: number = 2) {
    const { data, error } = await supabase
        .from('upcoming_events')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching featured events:', error)
        return []
    }

    return data
}

// CREATE new upcoming event
export async function createUpcomingEvent(eventData: {
    title: string
    description?: string
    category: string
    is_featured?: boolean
    fee?: string
    date?: string
    time?: string
    guests?: string
    image_url?: string
    register_url?: string  
}) {
    const { data, error } = await supabase
        .from('upcoming_events')
        .insert([eventData])
        .select()

    if (error) {
        console.error('Error creating event:', error)
        throw error
    }

    return data[0]
}

// UPDATE upcoming event
export async function updateUpcomingEvent(
    id: number,
    updates: Partial<{
        title: string
        description: string
        category: string
        is_featured: boolean
        fee: string
        date: string
        time: string
        guests: string
        image_url: string
        register_url?: string 
    }>
) {
    const { data, error } = await supabase
        .from('upcoming_events')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error updating event:', error)
        throw error
    }

    return data[0]
}

// DELETE upcoming event
export async function deleteUpcomingEvent(id: number, imageUrl?: string) {
    // Delete image from storage first (if exists)
    if (imageUrl) {
        await deleteImageFromStorage(imageUrl)
    }

    const { error } = await supabase
        .from('upcoming_events')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting event:', error)
        throw error
    }

    return true
}

// ========================================
// PREVIOUS EVENTS - CRUD
// ========================================

// GET all previous events
export async function getPreviousEvents() {
    const { data, error } = await supabase
        .from('previous_events')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching previous events:', error)
        return []
    }

    return data
}

// GET previous events for homepage (with limit)
export async function getPublicPreviousEvents(limit: number = 4) {
    const { data, error } = await supabase
        .from('previous_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching previous events:', error)
        return []
    }

    return data
}

// CREATE previous event
export async function createPreviousEvent(eventData: {
    title: string
    description?: string
    category: string
    icon_name?: string
    image_url?: string
}) {
    const { data, error } = await supabase
        .from('previous_events')
        .insert([eventData])
        .select()

    if (error) {
        console.error('Error creating previous event:', error)
        throw error
    }

    return data[0]
}

// UPDATE previous event
export async function updatePreviousEvent(
    id: number,
    updates: Partial<{
        title: string
        description: string
        category: string
        icon_name: string
        image_url: string
    }>
) {
    const { data, error } = await supabase
        .from('previous_events')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error updating previous event:', error)
        throw error
    }

    return data[0]
}

// DELETE previous event
export async function deletePreviousEvent(id: number, imageUrl?: string) {
    // Delete image from storage first (if exists)
    if (imageUrl) {
        await deleteImageFromStorage(imageUrl)
    }

    const { error } = await supabase
        .from('previous_events')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting previous event:', error)
        throw error
    }

    return true
}

// ========================================
// GALLERY IMAGES - CRUD
// ========================================

// GET all gallery images
export async function getGalleryImages() {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching gallery images:', error)
        return []
    }

    return data
}

// GET gallery images grouped by year
export async function getGalleryByYear() {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching gallery:', error)
        return []
    }

    // Group by year
    interface GalleryImage {
        id: number
        image_url: string
        year: string
        alt_text?: string
        created_at?: string
    }

    const grouped = data.reduce((acc: { [key: string]: GalleryImage[] }, item: GalleryImage) => {
        const year = item.year
        if (!acc[year]) {
            acc[year] = []
        }
        acc[year].push(item)
        return acc
    }, {})

    // Convert to array format
    return Object.entries(grouped).map(([year, items]) => ({
        year,
        items
    }))
}

// GET all years for filter buttons
export async function getGalleryYears(): Promise<string[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('year')
        .order('year', { ascending: false })

    if (error) {
        console.error('Error fetching years:', error)
        return []
    }

    // Get unique years
    const uniqueYears = [...new Set(data.map((item: { year: string }) => item.year))]
    return uniqueYears
}

// CREATE gallery image
export async function createGalleryImage(imageData: {
    image_url: string
    year: string
    alt_text?: string
}) {
    const { data, error } = await supabase
        .from('gallery_images')
        .insert([imageData])
        .select()

    if (error) {
        console.error('Error creating gallery image:', error)
        throw error
    }

    return data[0]
}

// UPDATE gallery image
export async function updateGalleryImage(
    id: number,
    updates: Partial<{
        image_url: string
        year: string
        alt_text: string
    }>
) {
    const { data, error } = await supabase
        .from('gallery_images')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error updating gallery image:', error)
        throw error
    }

    return data[0]
}

// DELETE gallery image
export async function deleteGalleryImage(id: number, imageUrl?: string) {
    // Delete image from storage first (if exists)
    if (imageUrl) {
        await deleteImageFromStorage(imageUrl)
    }

    const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting gallery image:', error)
        throw error
    }

    return true
}

// ========================================
// 📬 CONTACT MESSAGES - CRUD
// ========================================

// Type definition for Contact Message
export interface ContactMessage {
    id: number
    name: string
    email: string
    phone?: string
    company?: string
    space_type?: string
    message: string
    is_read: boolean
    created_at: string
    updated_at?: string
}

// GET all contact messages (for admin)
export async function getContactMessages() {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching contact messages:', error)
        return []
    }

    return data as ContactMessage[]
}

// GET unread messages count (for badge notification)
export async function getUnreadMessagesCount(): Promise<number> {
    const { count, error } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)

    if (error) {
        console.error('Error fetching unread count:', error)
        return 0
    }

    return count || 0
}

// CREATE new contact message (from contact form)
export async function createContactMessage(messageData: {
    name: string
    email: string
    phone?: string
    company?: string
    space_type?: string
    message: string
}) {
    const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...messageData, is_read: false }])
        .select()

    if (error) {
        console.error('Error creating contact message:', error)
        throw error
    }

    return data[0] as ContactMessage
}

// UPDATE - Mark message as read
export async function markMessageAsRead(id: number) {
    const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: true, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error marking message as read:', error)
        throw error
    }

    return data[0] as ContactMessage
}

// UPDATE - Mark message as unread
export async function markMessageAsUnread(id: number) {
    const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: false, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error marking message as unread:', error)
        throw error
    }

    return data[0] as ContactMessage
}

// DELETE contact message
export async function deleteContactMessage(id: number) {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting contact message:', error)
        throw error
    }

    return true
}

// DELETE multiple messages
export async function deleteMultipleMessages(ids: number[]) {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .in('id', ids)

    if (error) {
        console.error('Error deleting messages:', error)
        throw error
    }

    return true
}