// app/(main)/program/constants.ts

import { assets } from '@/assets/asset';
import { ProgramType, TrainerData } from '@/types/types';

export const TRAINER_DATA: Record<ProgramType, TrainerData> = {
    [ProgramType.YOGA]: {
        id: ProgramType.YOGA,
        title: "Yoga Fitness",
        heroHeader: "RECLAIM YOUR FLEXIBILITY AND INNER PEACE.",
        heroSubheader: "Join Her Hours for a transformative journey through movement and mindfulness designed just for you.",
        trainerName: "July Lai",
        trainerImage: assets.july_lai,
        trainerProfileImage: assets.profile_july_lai,
        aboutIntro: "Professional Yoga Instructor with 10+ years of practice in Malaysia.",
        aboutBio: "July Lai believes yoga is more than exercise.It’s a sustainable way to care for your body and mind. Her classes create a safe, calm space for women to start slowly, move with intention, and grow at their own rhythm without pressure or spiritual elements.",
        experience: {
            years: "10+ Years Teaching Beginner-Friendly Yoga",
            description: "Specialized in posture alignment, breath awareness, and slow, intentional movement for women of all levels.",
            background: "Trained in science-supported, body-respectful yoga methodology. Focus on physical wellness without chanting or religious elements."
        },
        badges: ["10+ Years Local Teaching Experience", "Beginner-Friendly Certified", "Muslim-Friendly Approach", "Body-Respectful Movement Philosophy"],
        gallery: [
             { type: 'video', url: "/videos/yoga_video_1.mp4", thumbnail: assets.yoga_video_thumbnail_1 },
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
            { question: "Who Should Apply?", answer: "Her Hour is perfect for beginners seeking gentle movement, stretching, and mindful breathing guided by an experienced instructor." },
            { question: "Is this women only?", answer: "Yes, Her Hour is conducted in women-only private setting to ensure comfort, safety and ease for all participants." },
            { question: "How long is the class?", answer: "Each session is 60 minutes." },
            { question: "How much is the class?", answer: "We offer paid trial and package (4 classes).Talk to us to find out more about the price." },
            { question: "What should i prepare?", answer: "Exercise mat, wear comfortable clothing, water bottle and towel if needed." },
            { question: "What if i have injury? Can i still join?", answer: "Please declare any injuries or conditions and check with your respective doctors before joining the session. The instructor will offer modifications where needed." },
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