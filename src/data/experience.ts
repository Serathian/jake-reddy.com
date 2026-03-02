import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    company: 'Current Role',
    role: 'Full Stack Developer',
    period: '2023 – present',
    bullets: [
      'Building and maintaining production web applications with Next.js and TypeScript.',
      'Architecting headless CMS solutions and REST API integrations.',
      'Deploying containerised services on self-hosted Linux infrastructure with Docker and Traefik.',
    ],
  },
  {
    company: 'Previous Role',
    role: 'Full Stack Developer',
    period: '2021 – 2023',
    bullets: [
      'Delivered full stack features across React frontends and Node.js backends.',
      'Managed PostgreSQL databases and authored migration strategies.',
      'Contributed to CI/CD pipeline design and deployment automation.',
    ],
  },
  {
    company: 'Earlier Work',
    role: 'Junior Developer',
    period: '2020 – 2021',
    bullets: [
      'Built responsive UIs in React and maintained legacy JavaScript codebases.',
      'Collaborated with senior engineers on API design and code review.',
    ],
  },
]
