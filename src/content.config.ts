import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const profile = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    statusPill: z.string(),
    headline: z.string(),
    aboutBio: z.string(),
    profileImage: z.string(),
    cvPath: z.string(),
    phone: z.string(),
    email: z.string(),
    location: z.string(),
    linkedin: z.string(),
    linkedinUrl: z.string().optional(),
    coreSkills: z.array(z.string()),
    languages: z.array(
      z.object({
        language: z.string(),
        proficiency: z.string(),
      })
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        session: z.string(),
        gpa: z.string().optional(),
      })
    ),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    period: z.string(),
    location: z.string(),
    description: z.string(),
    order: z.number().default(1),
  }),
});

const achievements = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['Research & Pharma', 'AI & Digital Health', 'Leadership & Civic']),
    organizer: z.string(),
    date: z.string().optional(),
    sessionLead: z.string().optional(),
    highlight: z.string(),
    featured: z.boolean().default(false),
    badgeLabel: z.string().optional(),
    order: z.number().default(1),
  }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/certificates' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    credentialId: z.string().optional(),
    category: z.enum(['Research & Pharma', 'AI & Digital Health', 'Leadership & Civic']),
    image: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(1),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    journalOrConference: z.string(),
    date: z.string(),
    authors: z.string(),
    summary: z.string(),
    paperUrl: z.string().optional().default(''),
    status: z.enum(['Published', 'Under Review', 'Preprint']).default('Published'),
    order: z.number().default(1),
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/workshops' }),
  schema: z.object({
    title: z.string(),
    organizer: z.string(),
    date: z.string(),
    role: z.string().default('Participant'),
    summary: z.string(),
    certificateImage: z.string().optional(),
    order: z.number().default(1),
  }),
});

export const collections = {
  profile,
  experience,
  achievements,
  certificates,
  certifications: certificates,
  publications,
  workshops,
};
