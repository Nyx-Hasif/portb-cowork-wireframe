// app/(main)/program/constants.ts

import { assets } from '@/assets/asset';
import { ProgramType, TrainerData } from '@/types/types';
// ✅ Tambah ni
import cardPodcast from "@/assets/card-podcast.png";
import cardConversations from "@/assets/card-conversations.png";
import cardCreative from "@/assets/card-creative.png";
import cardGames from "@/assets/card-games.png";
import cardRoleplay from "@/assets/card-roleplay.png";
import cardPublic from "@/assets/card-public.png";
import cardReflection from "@/assets/card-reflection.png";
import cardDebate from "@/assets/card-debate.png";

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
        ctaBg: assets.cta_yoga_bg,
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

    [ProgramType.ENGLISH_CLASS]: {
        id: ProgramType.ENGLISH_CLASS,
        title: "The Speaking Space",

        // ============================================
        // HERO
        // ============================================
        heroHeader: "FROM SHY TO CONFIDENT IN ENGLISH.",
        heroSubheader: "A fun and safe space for kids to speak freely and confidently — no judgment, just growth.",

        // ============================================
        // ABOUT / TRAINER
        // ============================================
        trainerName: "Ms. Aisyah",
        trainerImage: assets.ms_aisyah,
        trainerProfileImage: assets.profile_ms_aisyah,
        aboutIntro: "English Communication & Confidence Studio by English with Aisyah.",
        aboutBio: "",
        experience: {
            years: "10 years of teaching experience",
            description: "Me with love to teach English.",
            background: "Focus on confidence, expression, and real-life communication not just grammar drills."
        },
        badges: [
            "Lecturer",
            "Graduated from University of Nottingham",
            "expert in English communication",
            "expert in English teaching",
            "Port B Coworking",
        ],

        // ============================================
        // GALLERY
        // ============================================
        gallery: [
            { type: 'video', url: "/videos/english_class_1.mp4", thumbnail: assets.program_english_kids },
        ],

        // ============================================
        // BENEFITS — "What will students learn?"
        // ============================================
        benefits: [
            {
                title: "Speak With Confidence",
                description: "Students learn to answer questions clearly, express opinions, and communicate in real-life situations without fear.",
                imageUrl: assets.program_english_kids
            },
            {
                title: "Think & Express Ideas",
                description: "Beyond grammar drills — students build vocabulary, sentence structure, and the ability to express ideas clearly.",
                imageUrl: assets.program_english_kids
            },
            {
                title: "Grow Step by Step",
                description: "From basic speaking to public presentations — every student grows at their own pace through Vol. 1 Voice, Vol. 2 Ideas, and Vol. 3 Impact.",
                imageUrl: assets.program_english_kids
            }
        ],

        // ============================================
        // FAQ — from PDF (12 questions)
        // ============================================
        faqs: [
            {
                question: "Is this a normal English tuition class?",
                answer: "No. The Speaking Space is not focused only on worksheets, grammar drills, or exam preparation. We focus on helping students use English confidently through speaking activities, discussions, role play, storytelling, presentations, and real-life communication tasks."
            },
            {
                question: "My child understands English but is shy to speak. Is this suitable?",
                answer: "Yes. This programme is designed for students who may understand English but feel nervous, unsure, or shy when speaking. We create a safe and supportive space where students can practise step by step without fear of being judged."
            },
            {
                question: "Will grammar still be taught?",
                answer: "Yes, but grammar is taught naturally through speaking practice. Students will learn how to form better sentences, express ideas more clearly, and improve accuracy while communicating."
            },
            {
                question: "How will my child be grouped?",
                answer: "Students are grouped based on their age and communication needs. Junior Track is for ages 7–12. Varsity Track is for ages 13–17. We also observe each student's speaking confidence and ability so they can be supported at the right level."
            },
            {
                question: "What will students do in class?",
                answer: "Students may take part in activities such as speaking games, storytelling, picture talk, role play, group discussions, podcast-style speaking, public speaking practice, and creative presentations."
            },
            {
                question: "Is this suitable for beginners?",
                answer: "Yes, as long as the student is willing to try. Students who need more support will start with simple words, sentence frames, guided questions, and confidence-building activities."
            },
            {
                question: "Is this suitable for advanced students?",
                answer: "Yes. Students who are more confident will be challenged to express opinions, explain ideas, present, discuss, and communicate more independently."
            },
            {
                question: "Will there be homework?",
                answer: "Homework will be light and meaningful if given. The focus is not on heavy worksheets, but on helping students practise speaking, thinking, and expressing ideas."
            },
            {
                question: "How will parents know their child's progress?",
                answer: "Parents may receive simple updates based on the child's participation, confidence, speaking development, and areas for improvement. The main progress we look for is not only marks, but confidence, clarity, and communication growth."
            },
            {
                question: "What happens during the free trial?",
                answer: "During the free trial, students will join simple speaking-based activities. We will observe how they respond, speak, participate, and interact so we can understand their confidence level and learning needs."
            },
            {
                question: "What should my child bring?",
                answer: "Students only need to bring themselves, a water bottle, and a willingness to try. Any class materials will be guided during the session."
            },
            {
                question: "How do I register?",
                answer: "Parents can contact English with Aisyah to book a trial slot or ask about the next available intake. WhatsApp: +601099099198"
            },
        ],

        // ============================================
        // CTA
        // ============================================
        ctaBg: assets.program_english_kids,
        ctaLinks: {
            registerUrl: "https://forms.gle/brYQ2mmxWwE7a57N8",
            chatUrl: "https://wa.me/601099099198?text=Hi%2C%20saya%20berminat%20dengan%20The%20Speaking%20Space%20English%20Class",
        },
        ctaHeadline: "Where Young Voices Grow Into Bright Ideas",
        ctaDescription: "Free trial slots are now open. Come experience The Speaking Space before joining the full programme no pressure, just speaking, growing, and having fun.",
        ctaSocialProof: [
            "Free Trial Available",
            "Ages 7–17",
            "Small Group Class",
            "Junior & Varsity Tracks",
        ],

        // ============================================
        // TESTIMONIAL
        // ============================================
        testimonial: {
            videoUrl: "/videos/testimony_herhour.mp4",
            thumbnail: assets.program_english_kids,
            participantName: "Parent of Student",
            participantTitle: "The Speaking Space Participant",
            quote: "My child used to be so shy in class. After joining The Speaking Space, I can see the difference — she now speaks up and shares her ideas with confidence.",
        },

        // ============================================
        // SOCIAL LINKS
        // ============================================
        socialLinks: {
            instagram: "https://www.instagram.com/englishwithaisyah/",
            facebook: "https://www.facebook.com/englishwithaisyah",
        },

        // ============================================
        // ✅ ENGLISH SPECIFIC — New sections
        // ============================================
        englishProgramInfo: {

            // "Who is this for?"
            targetAudience: [
                "Understand English but feel shy to speak",
                "Can do worksheets but struggle to express ideas verbally",
                "Need more confidence in speaking and presentations",
                "Want to improve communication skills in a safe and supportive space",
                "Enjoy learning through creative and interactive activities",
            ],

            // "Our Tracks"
            tracks: [
                {
                    name: "Junior Track",
                    ageRange: "Ages 7–12",
                    description: "For primary school students who are building confidence, vocabulary, sentence structure, and courage to speak.",
                    activities: [
                        "Storytelling",
                        "Speaking Games",
                        "Picture Talk",
                        "Role Play",
                        "Simple Presentations",
                    ]
                },
                {
                    name: "Varsity Track",
                    ageRange: "Ages 13–17",
                    description: "For secondary school students who are ready to build stronger communication, opinions, presentation skills, and real-life English use.",
                    activities: [
                        "Group Discussions",
                        "Public Speaking",
                        "Opinion Sharing",
                        "Creative Tasks",
                        "Presentation-style Activities",
                    ]
                },
            ],

            // "How is class different?"
            // dalam englishProgramInfo:
            classMethods: [
                { emoji: "🎙", label: "Podcast-style Speaking", imageUrl: cardPodcast },
                { emoji: "💬", label: "Real Conversations", imageUrl: cardConversations },
                { emoji: "🧠", label: "Creative Thinking Activities", imageUrl: cardCreative },
                { emoji: "🎲", label: "Speaking Games", imageUrl: cardGames },
                { emoji: "🎭", label: "Role Play", imageUrl: cardRoleplay },
                { emoji: "🎤", label: "Public Speaking", imageUrl: cardPublic },
                { emoji: "📌", label: "Guided Feedback & Reflection", imageUrl: cardReflection },
                { emoji: "🤝", label: "Group Discussions", imageUrl: cardDebate },
            ],

            // "Learning Pathway"
            learningPathway: [
                {
                    volume: "Vol. 1",
                    title: "Voice",
                    description: "Building confidence, basic speaking, and simple responses."
                },
                {
                    volume: "Vol. 2",
                    title: "Ideas",
                    description: "Developing opinions, longer answers, and clearer expression."
                },
                {
                    volume: "Vol. 3",
                    title: "Impact",
                    description: "Strengthening presentation, discussion, creativity, and communication skills."
                },
            ],

            // "Class Format"
            classFormat: [
                "Small group learning",
                "Interactive speaking-based activities",
                "Supportive and safe learning environment",
                "Guided by prepared lesson plans",
                "Focus on confidence, expression, and communication",
                "Parent updates when needed",
            ],

            // "Free Trial"
            freeTrial: {
                title: "Free Trial Class",
                description: "We are opening free trial slots for students who would like to experience The Speaking Space before joining the full programme. During the trial class, students will take part in simple speaking activities so we can observe their confidence, communication level, and learning needs.",
            },

            // "Programme Details"
            programmeDetails: {
                location: "The Speaking Space / Port B, Kota Bharu",
                ageGroup: "7-17 years old",
                classType: "Small group English communication class",
                registration: "Limited slots available",
            },
        },
    },
};