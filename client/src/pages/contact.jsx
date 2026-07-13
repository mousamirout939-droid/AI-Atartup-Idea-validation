import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MessageSquare } from 'lucide-react';
import api from '../utils/api';
import Button from '../components/common/button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/feedback', form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow">
          <MessageSquare className="h-7 w-7" />
        </span>
        <h1 className="section-heading">Get in touch</h1>
        <p className="mt-3 text-gray-600">Questions, feedback, or partnership ideas — we'd love to hear from you.</p>
      </div>

      <form onSubmit={handleSubmit} className="card mt-10 space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Your name" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label className="label">Subject</label>
          <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" placeholder="What's this about?" />
        </div>
        <div>
          <label className="label">Message</label>
          <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" placeholder="Tell us more..." />
        </div>
        <Button type="submit" loading={loading} icon={Mail} className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
