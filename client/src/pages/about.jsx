import { Rocket, Target, Users, Sparkles } from 'lucide-react';

const values = [
  { icon: Target, title: 'Data over guesswork', desc: 'Every recommendation is grounded in structured AI analysis, not vague encouragement.' },
  { icon: Sparkles, title: 'Speed', desc: 'What used to take a consultant weeks now takes minutes.' },
  { icon: Users, title: 'Built for founders', desc: 'We designed every report to be something you could actually show an investor.' },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow">
          <Rocket className="h-7 w-7" />
        </span>
        <h1 className="section-heading">About IdeaValidator.AI</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          We built IdeaValidator.AI because too many founders spend months building something the market never wanted.
          Our AI runs the market research, competitive analysis, and investor-style scrutiny a good advisor would —
          instantly, and for a fraction of the cost.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {values.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-gray-900">{title}</h3>
            <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-gray-900 px-8 py-12 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Our mission</h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-300">
          Give every founder — not just the ones with connections — access to the kind of rigorous, structured
          feedback that used to be reserved for people in the right rooms.
        </p>
      </div>
    </div>
  );
}
