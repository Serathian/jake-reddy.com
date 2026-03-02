'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about',   label: 'About'   },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-surface/95 backdrop-blur-sm border-b border-rule">
      <nav
        className="max-w-2xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display font-700 text-sm tracking-wide text-ink hover:text-purple transition-colors duration-150"
        >
          Jake Reddy
        </Link>

        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="nav-link font-mono text-sm text-muted hover:text-ink transition-colors duration-150"
                  data-active={isActive ? 'true' : undefined}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
