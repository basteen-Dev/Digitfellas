'use client'

import { useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { renderMarkdown } from '@/lib/render-markdown'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [site, setSite] = useState(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSent(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to send message')

      setSent(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const run = async () => {
      const res = await fetch('/api/site', { cache: 'no-store' })
      const json = await res.json()
      setSite(json)
    }
    run()
  }, [])

  const contact = site?.pages?.contact

  return (
    <div className="container py-20 md:py-24">
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{contact?.title || 'Contact'}</h1>
      <div className="mt-3 max-w-2xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderMarkdown(contact?.subtitle || 'Tell us about your project.') }} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-border p-6">
          <div className="text-sm font-semibold">Message</div>
          <div className="mt-4 grid gap-3">
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Textarea
              placeholder="What do you want to build?"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <Button className="rounded-full" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
            {sent && <div className="text-xs text-green-600 font-medium">Message sent successfully! We'll get back to you soon.</div>}
            {error && <div className="text-xs text-red-600 font-medium">{error}</div>}
          </div>
        </Card>

        <Card className="rounded-2xl border-border p-6">
          <div className="text-sm font-semibold">Contact details</div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            {site?.footer?.contact?.email && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Email:</span>
                <a href={`mailto:${site.footer.contact.email}`} className="hover:text-primary">
                  {site.footer.contact.email}
                </a>
              </div>
            )}
            {site?.footer?.contact?.phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Phone:</span>
                <a href={`tel:${site.footer.contact.phone}`} className="hover:text-primary">
                  {site.footer.contact.phone}
                </a>
              </div>
            )}
            {site?.footer?.contact?.address && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Address:</span>
                <span>{site.footer.contact.address}</span>
              </div>
            )}
            {!site?.footer?.contact && (
              <div className="text-xs italic">Loading contact details...</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
