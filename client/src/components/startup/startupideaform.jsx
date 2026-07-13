import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lightbulb } from 'lucide-react';
import { useStartupStore } from '../../store/startupstore';
import Button from '../common/button';

const industries = [
  'SaaS / Software', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech', 'AI / Machine Learning',
  'Marketplace', 'Consumer Mobile App', 'Climate / CleanTech', 'Food & Beverage', 'Real Estate', 'Other',
];

export default function StartupIdeaForm() {
  const navigate = useNavigate();
  const { createIdea, loading } = useStartupStore();
  const [form, setForm] = useState({
    title: '', description: '', industry: '', targetMarket: '', stage: 'idea',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idea = await createIdea(form);
      toast.success('Idea created! Running AI analysis...');
      navigate(`/ideas/${idea._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create idea');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label">Idea Title</label>
        <input name="title" required value={form.title} onChange={handleChange} className="input" placeholder="e.g. AI-powered meal planning for busy parents" />
      </div>

      <div>
        <label className="label">Description</label>
        <textarea name="description" required minLength={20} rows={5} value={form.description} onChange={handleChange} className="input resize-none" placeholder="Describe the problem you're solving, who it's for, and how it works..." />
        <p className="mt-1 text-xs text-gray-400">The more detail you give, the more accurate the AI analysis will be.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Industry</label>
          <select name="industry" required value={form.industry} onChange={handleChange} className="input">
            <option value="">Select an industry</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Stage</label>
          <select name="stage" value={form.stage} onChange={handleChange} className="input">
            <option value="idea">Idea</option>
            <option value="prototype">Prototype</option>
            <option value="mvp">MVP</option>
            <option value="launched">Launched</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Target Market <span className="font-normal text-gray-400">(optional)</span></label>
        <input name="targetMarket" value={form.targetMarket} onChange={handleChange} className="input" placeholder="e.g. Working parents aged 28-45 in urban areas" />
      </div>

      <Button type="submit" loading={loading} icon={Lightbulb} className="w-full">
        Submit &amp; Run AI Validation
      </Button>
    </form>
  );
}
