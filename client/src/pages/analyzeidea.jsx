import Sidebar from '../components/common/sidebar';
import StartupIdeaForm from '../components/startup/startupideaform';

export default function AnalyzeIdea() {
  return (
    <div className="flex">
      <Sidebar variant="user" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-2xl font-bold text-gray-900">Submit a New Idea</h1>
          <p className="mt-1 text-sm text-gray-500">
            We'll run it through 9 AI-powered analysis modules — SWOT, market, competitors, investor scoring, revenue, cost, tech stack, business plan and pitch deck.
          </p>
          <div className="card mt-6 p-6">
            <StartupIdeaForm />
          </div>
        </div>
      </div>
    </div>
  );
}
