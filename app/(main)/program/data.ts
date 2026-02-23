// app/(main)/program/constants.ts

import { assets } from '@/assets/asset';
import { ProgramType, TrainerData } from '@/types/types';

export const TRAINER_DATA: Record<string, TrainerData> = {
    [ProgramType.YOGA]: {
        id: ProgramType.YOGA,
        title: "Yoga Fitness",
        heroHeader: "RECLAIM YOUR FLEXIBILITY AND INNER PEACE.",
        heroSubheader: "Join Her Hours for a transformative journey through movement and mindfulness designed just for you.",
        trainerName: "July Lai",
        trainerImage: assets.july_lai,
        trainerProfileImage: assets.profile_july_lai,
        aboutIntro: "Professional Yoga Instructor with 10+ years of practice in Malaysia.",
        aboutBio: "July Lai believes yoga is more than exercise.It's a sustainable way to care for your body and mind. Her classes create a safe, calm space for women to start slowly, move with intention, and grow at their own rhythm without pressure or spiritual elements.",
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
            { type: 'image', url: assets.program_chapters, thumbnail: assets.program_chapters },
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
        ctaBg: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=1920",
        ctaLinks: {
            registerUrl: "https://forms.gle/N5hky22GS97T9rAe7",
            chatUrl: "https://wa.me/60143298981?text=Hi%2C%20saya%20berminat%20dengan%20Her%20Hour%20program",
        },
        ctaHeadline: "Your Body Has Been Waiting For This",
        ctaDescription: "One class is all it takes to feel the difference. No experience needed, no judgment just you, your mat, and a room full of women cheering each other on.",
        ctaSocialProof: [
            "Women-Only Sessions",
            "Beginner Friendly",
            "Trial Available",
            "Guided by 10+ Year Expert",
        ],

        // ✅ Testimonial Video
        testimonial: {
            videoUrl: "/videos/testimony_herhour.mp4",
            thumbnail: assets.testimony_thumbnail,  // tukar dengan thumbnail testimonial sebenar
            participantName: "Sofia",                   // tukar nama sebenar
            participantTitle: "Her Hour Participant",
            quote: "I never thought yoga was for me until I joined Her Hour. The environment is so warm and welcoming, and I finally feel comfortable moving at my own pace.",
        },
        socialLinks: {
            instagram: "https://www.instagram.com/julylai.yogainstructor/",
            facebook: "https://www.facebook.com/julylai.yogainstructor",
            threads: "https://www.threads.com/@julylai.yogainstructor?xmt=AQF0AB4oamMTZVCXJMUMCQVoEhsim57fOUjuDNVgxn63x9g",
        },
    },

    // [ProgramType.CURIOUS_READER]: {
    //     id: ProgramType.CURIOUS_READER,
    //     title: "Curious Reader Club",
    //     heroHeader: "EXPAND YOUR MIND THROUGH READING.",
    //     heroSubheader: "Join a community of curious minds exploring books that inspire growth and meaningful conversations.",
    //     trainerName: "TBA",
    //     trainerImage: assets.program_curious_club,
    //     trainerProfileImage: assets.program_curious_club,
    //     aboutIntro: "A guided reading community for women who want to grow through books.",
    //     aboutBio: "Coming soon – more details will be announced.",
    //     experience: {
    //         years: "Coming Soon",
    //         description: "Details to be announced",
    //         background: "Details to be announced"
    //     },
    //     badges: ["Community-Based", "Women Only", "Growth-Focused"],
    //     gallery: [],
    //     benefits: [
    //         { title: "Mental Stimulation", description: "Keep your mind sharp and engaged through regular reading and discussion.", imageUrl: assets.program_curious_club },
    //         { title: "Community Connection", description: "Build meaningful friendships with like-minded women.", imageUrl: assets.program_curious_club },
    //         { title: "Personal Growth", description: "Discover new perspectives that challenge and inspire you.", imageUrl: assets.program_curious_club }
    //     ],
    //     faqs: [
    //         { question: "When will this program start?", answer: "Coming soon! Follow our socials for updates." },
    //         { question: "Is this women only?", answer: "Yes, this program is designed exclusively for women." },
    //     ],
    //     ctaBg: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1920"
    // },
};