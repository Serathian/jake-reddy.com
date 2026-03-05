// Local UI types — no direct Payload CMS equivalent.
// These model the frontend data layer until a CMS-backed profile/experience API exists.

export interface Profile {
  name: string
  title: string
  bio: string
  currentProject: string
  email: string
  github: string
  linkedin: string
  cvPath: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  bullets: string[]
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Infrastructure' | 'Other'

export interface SkillGroup {
  category: SkillCategory
  skills: string[]
}

// CMS types sourced from the shared Payload-generated package.
// JrPost and JrProject are the jr_ collections in basecamp-cms.
export type { JrPost, JrProject, Author, Tag, Media } from '@basecamp-cms/basecamp-cms-types'
