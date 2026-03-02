import type { Profile } from '@/types'

interface ContactLinksProps {
  profile: Pick<Profile, 'email' | 'github' | 'linkedin'>
}

export default function ContactLinks({ profile }: ContactLinksProps) {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: 'github.com/Serathian', href: profile.github },
    { label: 'linkedin.com/in/jake-reddy', href: profile.linkedin },
  ]

  return (
    <ul className="space-y-3 list-none p-0 m-0">
      {links.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="font-body text-base text-ink hover:text-teal transition-colors duration-150 flex items-center gap-2"
          >
            <span className="text-teal font-mono text-sm select-none" aria-hidden="true">→</span>
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}
