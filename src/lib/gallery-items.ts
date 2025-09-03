
import { Timestamp } from 'firebase/firestore';

export interface GalleryItem {
  id: string;
  name: string;
  description: string;
  prompt: string;
  code: string;
  previewHtml?: string;
  category?: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  likes?: number;
  copies?: number;
  createdAt?: Date | Timestamp; // Allow both for easier handling
  framework: 'html' | 'tailwindcss';
}

// Data needed to create a new gallery item, some fields are generated on server/DB
export type GalleryItemCreate = Omit<GalleryItem, 'id' | 'previewHtml' | 'createdAt'>;


// In-memory array is no longer used, but we'll keep it here for reference
// or if you need to quickly switch back to mock data.
export const galleryItems: GalleryItem[] = [];
