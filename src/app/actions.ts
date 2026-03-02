'use server'

import { redirect } from 'next/navigation'

export async function sendContactMessage(formData: FormData) {
  const name    = formData.get('name')?.toString().trim()
  const email   = formData.get('email')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  // Basic validation
  if (!name || !email || !message) return

  // Placeholder — replace with Resend / Nodemailer when ready
  console.log('Contact form submission:', { name, email, message })

  redirect('/contact?sent=1')
}
