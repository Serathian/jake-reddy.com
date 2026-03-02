import type { ExperienceEntry } from '@/types'

interface ExperienceListProps {
  experience: ExperienceEntry[]
  cvPath: string
}

export default function ExperienceList({ experience, cvPath }: ExperienceListProps) {
  return (
    <div className="mt-10">
      <h2 className="font-display font-[700] text-2xl text-ink mb-6">Experience</h2>

      <ol className="space-y-8 list-none p-0 m-0">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.period}`} className="border-t border-rule pt-6 first:border-t-0 first:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
              <div>
                <span className="font-display font-[700] text-base text-ink">
                  {entry.role}
                </span>
                <span className="font-body text-base text-muted ml-2">
                  — {entry.company}
                </span>
              </div>
              <span className="font-mono text-xs text-muted shrink-0">
                {entry.period}
              </span>
            </div>
            <ul className="space-y-1.5 list-none p-0 m-0">
              {entry.bullets.map((bullet, i) => (
                <li key={i} className="font-body text-sm text-muted leading-relaxed flex gap-3">
                  <span className="text-rule select-none shrink-0" aria-hidden="true">—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* CV download — single orange moment for this page */}
      <div className="mt-8 pt-6 border-t border-rule">
        <a
          href={cvPath}
          download
          className="font-mono text-sm font-[600] text-orange hover:text-orange/80 transition-colors duration-150 flex items-center gap-1"
        >
          Download CV <span className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  )
}
