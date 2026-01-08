// types/types.ts

import { StaticImageData } from 'next/image';

export enum ProgramType {
    YOGA = 'yoga',
    THERAPY = 'therapy'
}

export interface GalleryItem {
    type: 'image' | 'video';
    url: string | StaticImageData;      // ✅ Support both
    thumbnail: string | StaticImageData; // ✅ Support both
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface BenefitItem {
    title: string;
    description: string;
    imageUrl: string | StaticImageData;  // ✅ Support both
}

export interface TrainerData {
    id: ProgramType;
    title: string;
    heroHeader: string;
    heroSubheader: string;
    trainerName: string;
    trainerImage: string | StaticImageData;  // ✅ Support both
    trainerProfileImage: string | StaticImageData;  // ✅ Support both
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
    ctaBg: string | StaticImageData;  // ✅ Support both
}