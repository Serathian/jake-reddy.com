import { sendContactMessage } from '@/app/actions'

export default function ContactForm() {
  const inputClass =
    'w-full font-body text-sm text-ink bg-transparent border border-rule rounded-none px-3 py-2.5 placeholder:text-muted/60 focus:outline-none focus:border-purple transition-colors duration-150'

  return (
    <form action={sendContactMessage} className="mt-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-xs text-muted uppercase tracking-widest mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you working on?"
          className={`${inputClass} resize-none`}
        />
      </div>
      <div className="pt-1">
        <button
          type="submit"
          className="font-mono text-sm font-[600] text-orange hover:text-orange/80 transition-colors duration-150 flex items-center gap-1"
        >
          Send message <span className="cta-arrow">→</span>
        </button>
      </div>
    </form>
  )
}
