import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: 'shoffiullah360/aslamul-alam-portfolio-project',
        },
  ui: {
    brand: {
      name: 'Md. Aslamul Alam — Portfolio CMS',
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
    publications: collection({
      label: 'Publications (Research Papers)',
      slugField: 'title',
      path: 'src/content/publications/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Paper Title' } }),
        journalOrConference: fields.text({ label: 'Journal or Conference' }),
        date: fields.text({ label: 'Publication Date' }),
        authors: fields.text({ label: 'Authors' }),
        summary: fields.text({ label: 'Abstract / Summary', multiline: true }),
        paperUrl: fields.text({ label: 'Paper URL / DOI Link' }),
        status: fields.select({
          label: 'Publication Status',
          options: [
            { label: 'Published', value: 'Published' },
            { label: 'Under Review', value: 'Under Review' },
            { label: 'Preprint', value: 'Preprint' },
          ],
          defaultValue: 'Published',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
      },
    }),
    certificates: collection({
      label: 'Certificates (Verified Credentials)',
      slugField: 'title',
      path: 'src/content/certificates/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Certificate Title' } }),
        issuer: fields.text({ label: 'Issuing Organization' }),
        date: fields.text({ label: 'Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Research & Pharma', value: 'Research & Pharma' },
            { label: 'AI & Digital Health', value: 'AI & Digital Health' },
            { label: 'Leadership & Civic', value: 'Leadership & Civic' },
          ],
          defaultValue: 'Research & Pharma',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        image: fields.image({
          label: 'Certificate Image',
          directory: 'public/certificates',
          publicPath: '/certificates/',
        }),
        credentialId: fields.text({ label: 'Credential ID (Optional)' }),
        featured: fields.checkbox({ label: 'Featured Credential', defaultValue: false }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
      },
    }),
    workshops: collection({
      label: 'Workshops & Specialized Training',
      slugField: 'title',
      path: 'src/content/workshops/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Workshop Title' } }),
        organizer: fields.text({ label: 'Organizer' }),
        date: fields.text({ label: 'Date / Duration' }),
        role: fields.text({ label: 'Role / Participation' }),
        summary: fields.text({ label: 'Summary / Highlights', multiline: true }),
        certificateImage: fields.image({
          label: 'Certificate Image (Optional)',
          directory: 'public/certificates',
          publicPath: '/certificates/',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 1 }),
      },
    }),
  },
});
