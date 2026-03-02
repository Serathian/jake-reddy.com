import Hero from '@/components/hero'
import CurrentProject from '@/components/current-project'
import { profile } from '@/data/profile'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8">
      <Hero profile={profile} />
      <CurrentProject currentProject={profile.currentProject} />
    </div>
  )
}
