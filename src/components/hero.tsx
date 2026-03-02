import Link from 'next/link'
import type { Profile } from '@/types'

interface HeroProps {
  profile: Profile
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
      {/* Editorial masthead */}
      <div className="flex items-start gap-4 animate-fade-up">
        {/* Purple spine — the one memorable visual anchor */}
        <div
          className="w-[3px] rounded-full bg-purple shrink-0 mt-2"
          style={{ height: '64px' }}
          aria-hidden="true"
        />
        <div>
          <h1
            className="font-display font-[800] text-5xl sm:text-6xl lg:text-7xl text-ink leading-none tracking-tight"
          >
            {profile.name}
          </h1>
          <p
            className="mt-3 font-body italic text-xl sm:text-2xl text-muted"
            style={{ animationDelay: '80ms' }}
          >
            {profile.title}
          </p>
        </div>
      </div>

      {/* Rule */}
      <div
        className="mt-8 h-px bg-rule animate-fade-in"
        style={{ animationDelay: '200ms' }}
        aria-hidden="true"
      />

      {/* Bio */}
      <p
        className="mt-8 font-body text-lg text-ink leading-relaxed max-w-xl animate-fade-up"
        style={{ animationDelay: '280ms' }}
      >
        {profile.bio}
      </p>

      {/* CTAs */}
      <div
        className="mt-8 flex flex-wrap items-center gap-6 animate-fade-up"
        style={{ animationDelay: '380ms' }}
      >
        <a
          href={profile.cvPath}
          download
          className="font-mono text-sm font-[600] text-orange hover:text-orange/80 transition-colors duration-150 flex items-center gap-1"
        >
          View my CV <span className="cta-arrow">→</span>
        </a>
        <Link
          href="/contact"
          className="font-mono text-sm font-[600] text-ink border-b border-ink hover:border-purple hover:text-purple transition-colors duration-150 flex items-center gap-1 pb-px"
        >
          Get in touch <span className="cta-arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
