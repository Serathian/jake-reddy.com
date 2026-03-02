import type { Profile } from '@/types'

interface AboutBioProps {
  bio: Profile['bio']
}

export default function AboutBio({ bio }: AboutBioProps) {
  return (
    <div>
      <h2 className="font-display font-[700] text-2xl text-ink mb-4">About</h2>
      <p className="font-body text-base text-ink leading-relaxed">{bio}</p>
    </div>
  )
}
