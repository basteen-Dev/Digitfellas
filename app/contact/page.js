'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from 'lucide-react'

export default function Page() {
  const [site, setSite] = useState(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.")
      return
    }

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

  // Fetch site data for footer contact info (if needed dynamically) or hardcode if preferred to match design
  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/site', { cache: 'no-store' })
        if (res.ok) {
          const json = await res.json()
          setSite(json)
        }
      } catch (e) {
        console.error("Failed to fetch site info", e)
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      <div className="container max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Context & Info */}
          <div className="flex flex-col justify-center">
            <ScrollReveal variant="fade-right">
              <h1 className="text-4xl md:text-4xl font-bold font-heading leading-tight mb-8">
                Start a Conversation.
              </h1>
              <p className="text text-gray-400 font-body leading-relaxed mb-12 max-w-lg">
                We work best with organizations that value clarity, structure, and long-term thinking. We’ll respond with context — not a sales pitch.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                    <a href="mailto:hello@digitfellas.com" className="text-gray-400 hover:text-white transition-colors">
                      {site?.footer?.contact?.email || 'hello@digitfellas.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Office</h3>
                    <p className="text-gray-400">
                      {site?.footer?.contact?.address || 'chennai, Tamil Nadu, India'}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            <ScrollReveal variant="fade-left" delay={200}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 h-14 rounded-xl px-4 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                  <Input
                    placeholder="john@company.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 h-14 rounded-xl px-4 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#141414] border-white/10 text-white placeholder:text-gray-600 focus:border-white/30 rounded-xl px-4 py-4 text-lg resize-none"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full bg-white hover:bg-gray-200 text-black font-bold h-14 rounded-xl text-lg transition-all"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>

                {sent && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                    Message sent successfully! We'll be in touch.
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                    {error}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  )
}
