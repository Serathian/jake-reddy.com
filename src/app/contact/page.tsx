import type { Metadata } from 'next'
import ContactLinks from '@/components/contact-links'
import ContactForm from '@/components/contact-form'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jake Reddy — open to freelance and full-time roles.',
}

interface ContactPageProps {
  searchParams: Promise<{ sent?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { sent } = await searchParams

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16">
      {/* Page heading */}
      <div className="flex items-start gap-4 mb-12 animate-fade-up">
        <div
          className="w-[3px] rounded-full bg-purple shrink-0 mt-1"
          style={{ height: '36px' }}
          aria-hidden="true"
        />
        <h1 className="font-display font-[800] text-4xl sm:text-5xl text-ink leading-tight">
          Get in touch
        </h1>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <p className="font-body text-base text-ink mb-8">
          I&apos;m open to freelance projects and full-time roles. The best way to
          reach me:
        </p>

        <ContactLinks
          profile={{ email: profile.email, github: profile.github, linkedin: profile.linkedin }}
        />

        {/* Divider */}
        <div className="my-10 h-px bg-rule" aria-hidden="true" />

        {/* Form heading */}
        <h2 className="font-display font-[700] text-xl text-ink mb-1">
          Or send a message
        </h2>
        <p className="font-body text-sm text-muted mb-0">
          I usually respond within a day or two.
        </p>

        {sent === '1' ? (
          <div className="mt-8 p-4 border border-teal/30 bg-teal/5">
            <p className="font-mono text-sm text-teal">
              Message sent — I&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <ContactForm />
        )}
      </div>
    </div>
  )
}
