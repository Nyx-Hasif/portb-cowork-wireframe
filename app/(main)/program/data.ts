// app/(main)/program/constants.ts

import { assets } from '@/assets/asset';
import { ProgramType, TrainerData } from '@/types/types';

export const TRAINER_DATA: Record<ProgramType, TrainerData> = {
    [ProgramType.YOGA]: {
        id: ProgramType.YOGA,
        title: "Yoga Fitness",
        heroHeader: "RECLAIM YOUR FLEXIBILITY AND INNER PEACE.",
        heroSubheader: "Join Her Hours for a transformative journey through movement and mindfulness.",
        trainerName: "July Lai",
        trainerImage: assets.july_lai,
        trainerProfileImage: assets.profile_july_lai,
        aboutIntro: "Professional Yoga Instructor with 10+ years of practice in Malaysia.",
        aboutBio: "Elena has spent over a decade traveling the world, learning from masters in India and Bali. Her philosophy centers on the union of breath and movement to heal the physical body and quiet the mind.",
        experience: {
            years: "10 Years Professional Practice",
            description: "Specialized in mobility recovery and athletic flexibility enhancement.",
            background: "Certified RYT-500 from the International Yoga Alliance and Master's in Sports Science."
        },
        badges: ["Yoga Alliance RYT-500", "Ministry of Health Certified", "Global Wellness Award 2022", "Licensed Physiotherapist"],
        gallery: [
             { type: 'video', url: "/videos/theraphy_video_1.mp4", thumbnail: assets.yoga_video_thumbnail_1 },
            { type: 'image', url: assets.portb_yoga_1, thumbnail: assets.portb_yoga_1 },
            { type: 'image', url: assets.portb_yoga_2, thumbnail: assets.portb_yoga_2 },
            { type: 'image', url: assets.portb_yoga_3, thumbnail: assets.portb_yoga_3 },
            { type: 'image', url: assets.portb_yoga_4, thumbnail: assets.portb_yoga_4 },
            { type: 'image', url: assets.portb_yoga_5, thumbnail: assets.portb_yoga_5 },
            { type: 'image', url: assets.portb_yoga_6, thumbnail: assets.portb_yoga_6 },
            { type: 'image', url: assets.portb_yoga_7, thumbnail: assets.portb_yoga_7 },
        ],
        benefits: [
            { title: "Increased Flexibility", description: "Improve your range of motion and reduce the risk of injury through targeted stretching.", imageUrl: assets.yoga_benefit_1 },
            { title: "Stress Reduction", description: "Lower cortisol levels and find your center in a chaotic world with breathing exercises.", imageUrl: assets.yoga_benefit_2 },
            { title: "Muscle Toning", description: "Build lean strength using only your own body weight and isometric holds.", imageUrl: assets.yoga_benefit_3 }
        ],
        faqs: [
            { question: "Why Join this programs?", answer: "Our program is designed for all levels, focusing on long-term sustainability and mental clarity, not just physical poses." },
            { question: "Who Should Apply?", answer: "Anyone seeking to reconnect with their body, improve posture, or find a mindful escape from high-stress environments." },
            { question: "Program of Focus", answer: "A blend of traditional Hatha alignment and modern Vinyasa flow, tailored to individual progression." }
        ],
        ctaBg: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=1920"
    },
    [ProgramType.THERAPY]: {
        id: ProgramType.THERAPY,
        title: "Therapy Mental",
        heroHeader: "REBUILD YOUR INNER BALANCE.",
        heroSubheader: "Work with Ms.Atirah to navigate life's complexities with resilience.",
        trainerName: "Ms. Atirah",
        trainerImage: assets.atirah,
        trainerProfileImage: assets.profile_atirah,
        aboutIntro: "Clinical Psychologist specializing in cognitive behavioral therapy and mindfulness.",
        aboutBio: "Atirah has dedicated xXx years to helping individuals overcome trauma and anxiety. She believes that mental fitness is as crucial as physical health and requires consistent, guided practice.",
        experience: {
            years: "XX Years Clinical Experience",
            description: "Former head of Behavioral Health at the Metropolitan Wellness Center.",
            background: "Ph.D. in Clinical Psychology from University Kebangsaan Malaysia.Registered clinical psychologist."
        },
        badges: ["Board Certified Therapist", "Mental Health Excellence Award", "Author of 'The Quiet Mind'", "Health Minister Appointee"],
        gallery: [
            { type: 'video', url: "/videos/theraphy_video_1.mp4", thumbnail: assets.theraphy_video_thumbnail_1 },
            { type: 'image', url: assets.theraphy_thumbnail_1, thumbnail: assets.theraphy_thumbnail_1 },
            { type: 'image', url: assets.theraphy_thumbnail_2, thumbnail: assets.theraphy_thumbnail_2 },
            { type: 'image', url: assets.theraphy_thumbnail_3, thumbnail: assets.theraphy_thumbnail_3 },
            { type: 'image', url: assets.theraphy_thumbnail_4, thumbnail: assets.theraphy_thumbnail_4 },
           
        ],
        benefits: [
            { title: "Emotional Resilience", description: "Develop tools to handle life's ups and downs with grace and stability.", imageUrl: assets.theraphy_benefit_1 },
            { title: "Improved Focus", description: "Learn mindfulness techniques to stay present and productive in high-pressure roles.", imageUrl: assets.theraphy_benefit_2 },
            { title: "Trauma Healing", description: "A safe space to process and move past historical obstacles with professional care.", imageUrl: assets.theraphy_benefit_3 }
        ],
        faqs: [
            { question: "Why Join this programs?", answer: "Our mental therapy program offers structured, science-backed pathways to emotional stability and self-discovery." },
            { question: "Who Should Apply?", answer: "Individuals feeling overwhelmed by stress, navigating major life changes, or seeking to improve their emotional intelligence." },
            { question: "Program of Focus", answer: "A hybrid of CBT and contemplative psychology designed for modern lifestyles." }
        ],
        ctaBg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920"
    }
};