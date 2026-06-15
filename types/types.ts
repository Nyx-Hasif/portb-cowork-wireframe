// types/types.ts

import { StaticImageData } from 'next/image';

export enum ProgramType {
    YOGA = 'herhour',
    // THERAPY = 'therapy',
    CURIOUS_READER = 'curious-reader',
    ENGLISH_CLASS = 'english-class',
}

export interface GalleryItem {
    type: 'image' | 'video';
    url: string | StaticImageData;
    thumbnail: string | StaticImageData;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface BenefitItem {
    title: string;
    description: string;
    imageUrl: string | StaticImageData;
}

export interface CtaLinks {
    registerUrl: string;
    chatUrl: string;
}

export interface TestimonialVideo {
    videoUrl: string;
    thumbnail: string | StaticImageData;
    participantName: string;
    participantTitle: string;
    quote: string;
}

export interface SocialLinks {
    instagram?: string;
    facebook?: string;
    threads?: string;
    email?: string;
    tiktok?: string;
}

// ✅ NEW - English Class specific types
export interface EnglishTrack {
    name: string;         // "Junior Track" / "Varsity Track"
    ageRange: string;     // "Ages 7–12" / "Ages 13–17"
    description: string;
    activities: string[];
}

export interface EnglishLearningPathway {
    volume: string;       // "Vol. 1"
    title: string;        // "Voice"
    description: string;  // "Building confidence..."
}

export interface EnglishClassMethod {
    emoji: string;
    label: string;        // "Podcast-style speaking"
    imageUrl: StaticImageData | string; // ✅ tambah ni
}

export interface EnglishProgramInfo {
    // "Who is this for?" section
    targetAudience: string[];

    // "Our Tracks" section
    tracks: EnglishTrack[];

    // "How is class different?" section
    classMethods: EnglishClassMethod[];

    // "Learning Pathway" section
    learningPathway: EnglishLearningPathway[];

    // "Class Format" section
    classFormat: string[];

    // "Free Trial" section
    freeTrial: {
        title: string;
        description: string;
    };

    // Programme Details
    programmeDetails: {
        location: string;
        ageGroup: string;
        classType: string;
        registration: string;
    };
}
// ✅ END NEW

export interface TrainerData {
    id: ProgramType | string;
    title: string;
    heroHeader: string;
    heroSubheader: string;
    trainerName: string;
    trainerImage: string | StaticImageData;
    trainerProfileImage: string | StaticImageData;
    aboutIntro: string;
    aboutBio: string;
    experience: {
        years: string;
        description: string;
        background: string;
    };
    badges: string[];
    gallery: GalleryItem[];
    benefits: BenefitItem[];
    faqs: FaqItem[];
    ctaBg: string | StaticImageData;
    ctaLinks: CtaLinks;
    ctaHeadline: string;
    ctaDescription: string;
    ctaSocialProof: string[];
    testimonial?: TestimonialVideo;
    socialLinks?: SocialLinks;

    // ✅ NEW - Optional, only English Class will have this
    englishProgramInfo?: EnglishProgramInfo;
}