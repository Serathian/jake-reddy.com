import type { Metadata } from 'next'
import AboutBio from '@/components/about-bio'
import ExperienceList from '@/components/experience-list'
import SkillsSection from '@/components/skills-section'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { skills } from '@/data/skills'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, experience, and skills of Jake Reddy — full stack developer.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
      {/* Page heading with purple accent bar */}
      <div className="flex items-start gap-4 mb-12 animate-fade-up">
        <div
          className="w-[3px] rounded-full bg-purple shrink-0 mt-1"
          style={{ height: '36px' }}
          aria-hidden="true"
        />
        <h1 className="font-display font-[800] text-4xl sm:text-5xl text-ink leading-tight">
          About me
        </h1>
      </div>

      {/* Two-column grid: left = bio + experience, right = skills */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-16">
        {/* Left column */}
        <div className="md:col-span-3 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <AboutBio bio={profile.bio} />
          <ExperienceList experience={experience} cvPath={profile.cvPath} />
        </div>

        {/* Right column */}
        <div
          className="md:col-span-2 md:border-l md:border-rule md:pl-10 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          <SkillsSection skills={skills} />

          {/* Contact links */}
          <div className="mt-10 pt-6 border-t border-rule">
            <h2 className="font-display font-[700] text-2xl text-ink mb-4">Elsewhere</h2>
            <ul className="space-y-2 list-none p-0 m-0">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-body text-sm text-muted hover:text-teal transition-colors duration-150"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted hover:text-teal transition-colors duration-150"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted hover:text-teal transition-colors duration-150"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
