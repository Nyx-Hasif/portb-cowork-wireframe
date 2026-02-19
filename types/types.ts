// types/types.ts

import { StaticImageData } from 'next/image';

export enum ProgramType {
    YOGA = 'herhour',
    // THERAPY = 'therapy',
    CURIOUS_READER = 'curious-reader',
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

// ✅ NEW - Testimonial
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
}