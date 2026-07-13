import { Link } from 'react-router-dom';
import { Rocket, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 text-white">
                <Rocket className="h-4 w-4" />
              </span>
              IdeaValidator<span className="text-brand-600">.AI</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Validate your startup idea in minutes with AI-powered market, competitor, and investor analysis.
            </p>
            <div className="mt-4 flex gap-3 text-gray-400">
              <a href="#" aria-label="Twitter" className="hover:text-brand-600"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="GitHub" className="hover:text-brand-600"><Github className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-brand-600"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link to="/pricing" className="hover:text-brand-600">Pricing</Link></li>
              <li><Link to="/register" className="hover:text-brand-600">Get Started</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-600">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-brand-600">About</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} IdeaValidator.AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
