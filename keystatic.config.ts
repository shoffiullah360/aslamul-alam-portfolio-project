import { config, fields, collection, singleton } from '@keystatic/core';

const repoOwner =
  typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_KEYSTATIC_GITHUB_OWNER
    ? import.meta.env.PUBLIC_KEYSTATIC_GITHUB_OWNER
    : '';
const repoName =
  typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_KEYSTATIC_GITHUB_REPO
    ? import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO
    : '';

const useGithubStorage = Boolean(repoOwner && repoName);

export default config({
  storage: useGithubStorage
    ? {
        kind: 'github',
        repo: {
          owner: repoOwner,
          name: repoName,
        },
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: 'Md. Aslamul Alam — Bio-Health Portfolio CMS',
    },
  },
  singletons: {
    profile: singleton({
      label: 'Profile & Bio Details',
      path: 'src/content/profile/main',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Full Name', validation: { isRequired: true } }),
        statusPill: fields.text({ label: 'Hero Status Pill', defaultValue: 'B.Pharm | AI & Digital Health' }),
        headline: fields.text({ label: 'Headline', multiline: true }),
        aboutBio: fields.text({ label: 'About Bio', multiline: true }),
        profileImage: fields.text({ label: 'Profile Photo Path', defaultValue: '/profile.jpg' }),
        cvPath: fields.text({ label: 'CV PDF Path', defaultValue: '/cv.pdf' }),
        phone: fields.text({ label: 'Phone Number' }),
        email: fields.text({ label: 'Email Address' }),
        location: fields.text({ label: 'Location' }),
        linkedin: fields.text({ label: 'LinkedIn Profile Name' }),
        linkedinUrl: fields.text({ label: 'LinkedIn URL' }),
        coreSkills: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Core Skills',
          itemLabel: (props) => props.value,
        }),
        languages: fields.array(
          fields.object({
            language: fields.text({ label: 'Language' }),
            proficiency: fields.text({ label: 'Proficiency' }),
          }),
          {
            label: 'Languages',
            itemLabel: (props) => `${props.fields.language.value} (${props.fields.proficiency.value})`,
          }
        ),
        education: fields.array(
          fields.object({
            degree: fields.text({ label: 'Degree / Certificate' }),
            institution: fields.text({ label: 'Institution' }),
            session: fields.text({ label: 'Session / Status' }),
            gpa: fields.text({ label: 'GPA / Highlight' }),
          }),
          {
            label: 'Education History',
            itemLabel: (props) => props.fields.degree.value,
          }
        ),
      },
    }),
  },
  collections: {
    experience: collection({
      label: 'Leadership & Experience',
      slugField: 'title',
      path: 'src/content/experience/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Role Title' } }),
        organization: fields.text({ label: 'Organization / Event' }),
        period: fields.text({ label: 'Date / Period' }),
        location: fields.text({ label: 'Location & Mode' }),
        description: fields.text({ label: 'Role Description', multiline: true }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
      },
    }),
    achievements: collection({
      label: 'Key Achievements & Workshops',
      slugField: 'title',
      path: 'src/content/achievements/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Achievement / Workshop Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Research & Pharma', value: 'Research & Pharma' },
            { label: 'AI & Digital Health', value: 'AI & Digital Health' },
            { label: 'Leadership & Civic', value: 'Leadership & Civic' },
          ],
          defaultValue: 'Research & Pharma',
        }),
        organizer: fields.text({ label: 'Organizer' }),
        date: fields.text({ label: 'Date / Duration' }),
        sessionLead: fields.text({ label: 'Session Lead / Special Note (Optional)' }),
        highlight: fields.text({ label: 'Executive Summary / Highlight', multiline: true }),
        featured: fields.checkbox({ label: 'Featured Gold Award Card', defaultValue: false }),
        badgeLabel: fields.text({ label: 'Special Badge Label (Optional)' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
      },
    }),
    certifications: collection({
      label: 'Certifications & Verified Credentials',
      slugField: 'title',
      path: 'src/content/certifications/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Certificate Title' } }),
        issuer: fields.text({ label: 'Issuing Organization' }),
        date: fields.text({ label: 'Issue Date' }),
        credentialId: fields.text({ label: 'Credential ID (Optional)' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Research & Pharma', value: 'Research & Pharma' },
            { label: 'AI & Digital Health', value: 'AI & Digital Health' },
            { label: 'Leadership & Civic', value: 'Leadership & Civic' },
          ],
          defaultValue: 'Research & Pharma',
        }),
        image: fields.image({
          label: 'Certificate Image',
          directory: 'public/certificates',
          publicPath: '/certificates/',
        }),
        summary: fields.text({ label: '2-Line Concise Summary', multiline: true }),
        featured: fields.checkbox({ label: 'Featured Credential', defaultValue: false }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
      },
    }),
  },
});
