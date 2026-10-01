import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { profile } from '@/data/profile';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { socialIcons } from '../icons';

const emptyForm = { name: '', email: '', subject: '', message: '' };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Firebase is loaded on demand to keep it out of the initial bundle
      const [{ collection, addDoc, serverTimestamp }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('@/lib/firebase'),
      ]);

      await addDoc(collection(db, 'contacts'), { ...form, submittedAt: serverTimestamp() });

      const safe = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, escapeHtml(v)])) as typeof form;
      await addDoc(collection(db, 'mail'), {
        to: profile.email,
        replyTo: form.email,
        message: {
          subject: `Portfolio Contact: ${form.subject}`,
          html: `
            <h3>New message from your portfolio</h3>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Subject:</strong> ${safe.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${safe.message.replace(/\n/g, '<br/>')}</p>
          `,
        },
      });

      toast.success('Message sent!', { description: "Thanks for reaching out — I'll get back to you soon." });
      setForm(emptyForm);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong', { description: `Please try again or email ${profile.email} directly.` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a question, an idea or an opportunity? I'm always happy to talk distributed systems, AI tooling or side projects. I usually reply within a day or two."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="flex flex-col gap-4">
            <div className="surface p-6">
              <p className="text-sm text-muted-foreground">Email me directly</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <a href={`mailto:${profile.email}`} className="link-underline truncate text-lg font-medium">
                  {profile.email}
                </a>
                <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-full" onClick={copyEmail} aria-label="Copy email">
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="surface divide-y">
              <a href={profile.phoneHref} className="flex items-center gap-3 p-5 text-sm transition-colors hover:bg-secondary/50">
                <Phone className="h-4 w-4 text-muted-foreground" /> {profile.phone}
              </a>
              <div className="flex items-center gap-3 p-5 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" /> {profile.location} · IST (UTC+5:30)
              </div>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 p-5 text-sm transition-colors hover:bg-secondary/50">
                <Mail className="h-4 w-4 text-muted-foreground" /> Prefer email? Write anytime
              </a>
            </div>

            <div className="surface p-6">
              <p className="mb-3 text-sm text-muted-foreground">Find me elsewhere</p>
              <div className="grid grid-cols-2 gap-2">
                {profile.socials.slice(0, 6).map((s) => {
                  const Icon = socialIcons[s.label];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-secondary"
                    >
                      <span className="flex items-center gap-2">
                        <Icon size={15} /> {s.label}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={handleSubmit} className="surface space-y-5 p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={update} placeholder="Jane Doe" required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    placeholder="jane@company.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={form.subject} onChange={update} placeholder="Role at Acme / Collaboration / Just saying hi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell me a bit about what you have in mind…"
                  rows={6}
                  required
                  className="resize-none"
                />
              </div>
              <Button type="submit" size="lg" disabled={submitting} className="h-11 w-full rounded-full sm:w-auto sm:px-8">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
