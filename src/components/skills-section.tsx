import type { SkillGroup } from '@/types'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div>
      <h2 className="font-display font-[700] text-2xl text-ink mb-6">Skills</h2>
      <div className="space-y-5">
        {skills.map(({ category, skills: items }) => (
          <div key={category}>
            {/* Small-caps category label */}
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
              {category}
            </h3>
            <p className="font-body text-sm text-ink leading-relaxed">
              {items.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
