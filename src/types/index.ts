// These interfaces mirror the shape that Payload CMS will eventually return.
// Swapping src/data/* imports for fetch() calls will be the only migration needed.

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
