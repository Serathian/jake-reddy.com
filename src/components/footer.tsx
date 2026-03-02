import Link from 'next/link'
import { profile } from '@/data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-rule mt-24 py-8">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          Jake Reddy &copy; {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-teal transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-teal transition-colors duration-150"
          >
            LinkedIn
          </a>
          <Link
            href="/contact"
            className="font-mono text-xs text-muted hover:text-teal transition-colors duration-150"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
