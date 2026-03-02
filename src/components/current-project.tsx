import type { Profile } from '@/types'

interface CurrentProjectProps {
  currentProject: Profile['currentProject']
}

export default function CurrentProject({ currentProject }: CurrentProjectProps) {
  return (
    <div
      className="mt-4 pt-6 border-t border-rule animate-fade-in"
      style={{ animationDelay: '500ms' }}
    >
      <p className="font-mono text-sm text-muted">
        <span className="text-teal font-[600]">Building ·</span>{' '}
        {currentProject}
      </p>
    </div>
  )
}
