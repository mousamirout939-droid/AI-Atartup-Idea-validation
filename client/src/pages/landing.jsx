import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, Target, Users, DollarSign, Code2, FileText, ShieldCheck, ArrowRight, CheckCircle2,
} from 'lucide-react';

const features = [
  { icon: Target, title: 'SWOT Analysis', desc: 'Strengths, weaknesses, opportunities & threats — mapped out instantly.' },
  { icon: Sparkles, title: 'Market Analysis', desc: 'Market size, growth rate, trends and entry barriers for your idea.' },
  { icon: Users, title: 'Competitor Analysis', desc: 'See who you are up against and how you can differentiate.' },
  { icon: ShieldCheck, title: 'Investor Score', desc: 'Get scored the way a VC would evaluate your pitch.' },
  { icon: DollarSign, title: 'Revenue & Cost Models', desc: '3-year projections and realistic first-year cost estimates.' },
  { icon: Code2, title: 'Tech Stack Advice', desc: 'A practical, budget-aware stack recommendation for your MVP.' },
  { icon: FileText, title: 'Business Plan', desc: 'Auto-generated executive summary, milestones & risk mitigation.' },
  { icon: Rocket, title: 'Pitch Deck Generator', desc: 'Investor-ready slide content, exportable straight to PPTX.' },
];

const steps = [
  { step: '01', title: 'Describe your idea', desc: 'Tell us the problem, your solution, and your target market.' },
  { step: '02', title: 'AI runs 9 analyses', desc: 'SWOT, market, competitors, investor score, revenue, cost, tech stack & more — in parallel.' },
  { step: '03', title: 'Get your verdict', desc: 'A clear viability score, verdict, and downloadable investor-ready report.' },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-pattern">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge mx-auto mb-6 border border-brand-100 bg-brand-50 text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> Powered by GPT-4
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Validate your startup idea <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">before you build it</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
              Get instant SWOT, market, competitor and investor analysis — plus revenue models, cost estimates and an investor-ready pitch deck. All in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/register" className="btn-primary px-7 py-3 text-base">
                Validate My Idea <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-secondary px-7 py-3 text-base">See Pricing</Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">No credit card required · 3 free ideas every month</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Nine AI-powered validation modules</h2>
          <p className="mt-3 text-gray-500">Everything a founder needs to know before pitching or building.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-gray-900">{title}</h3>
              <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">How it works</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <span className="font-display text-5xl font-extrabold text-brand-100">{step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-8 py-16 text-center text-white shadow-glow">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Stop guessing. Start validating.</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Join founders using AI to de-risk their next big idea before spending months building it.
          </p>
          <Link to="/register" className="btn mt-8 inline-flex bg-white px-7 py-3 text-base text-brand-700 hover:bg-brand-50">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-100">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 3 free ideas/mo</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
}
