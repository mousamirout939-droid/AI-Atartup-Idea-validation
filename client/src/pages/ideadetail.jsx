import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sparkles, RefreshCw, Presentation } from 'lucide-react';
import Sidebar from '../components/common/sidebar';
import Loader from '../components/common/loader';
import Button from '../components/common/button';
import IdeaDetailsHeader from '../components/startup/ideadetails';
import StartupSummary from '../components/startup/startupsummary';
import SWOTAnalysis from '../components/ai/SWOTanalysis';
import MarketAnalysisView from '../components/ai/marketanalysis';
import CompetitorAnalysis from '../components/ai/competitoranalysis';
import InvestorScoreView from '../components/ai/investorscore';
import RevenueModelView from '../components/ai/revenuemodel';
import CostEstimator from '../components/ai/costestimator';
import TechStackSuggestion from '../components/ai/techstacksuggestion';
import BusinessPlanView from '../components/ai/businessplan';
import BusinessRoadmap from '../components/ai/businessroadmap';
import DownloadPDF from '../components/reports/downloadPDF';
import DownloadPPT from '../components/reports/downloadPPT';
import ExportExcel from '../components/reports/exportexcel';
import ShareReport from '../components/reports/sharereport';
import { useStartupStore } from '../store/startupstore';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'swot', label: 'SWOT' },
  { key: 'market', label: 'Market' },
  { key: 'competitor', label: 'Competitors' },
  { key: 'investor', label: 'Investor Score' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'cost', label: 'Cost' },
  { key: 'techstack', label: 'Tech Stack' },
  { key: 'businessplan', label: 'Business Plan' },
];

export default function IdeaDetail() {
  const { id } = useParams();
  const { currentIdea, analyses, loading, analyzing, getIdeaById, analyzeIdea } = useStartupStore();
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    getIdeaById(id).catch(() => toast.error('Idea not found'));
  }, [id, getIdeaById]);

  const handleAnalyze = async () => {
    try {
      await analyzeIdea(id);
      toast.success('Full AI validation complete!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed');
    }
  };

  if (loading && !currentIdea) return <Loader fullScreen label="Loading idea..." />;
  if (!currentIdea) return null;

  const notAnalyzed = currentIdea.status === 'draft';

  return (
    <div className="flex">
      <Sidebar variant="user" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <IdeaDetailsHeader idea={currentIdea} />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {notAnalyzed ? (
            <Button icon={Sparkles} loading={analyzing} onClick={handleAnalyze}>
              Run Full AI Validation
            </Button>
          ) : (
            <>
              <Button variant="secondary" icon={RefreshCw} loading={analyzing} onClick={handleAnalyze}>
                Re-run Analysis
              </Button>
              <DownloadPDF ideaId={id} />
              <DownloadPPT ideaId={id} />
              <ExportExcel idea={currentIdea} analyses={analyses} />
              <ShareReport ideaId={id} />
            </>
          )}
        </div>

        {analyzing && (
          <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm text-brand-700">
            Running SWOT, market, competitor, investor, revenue, cost, tech stack and business plan analysis in parallel — this usually takes 20-40 seconds...
          </div>
        )}

        {!notAnalyzed && (
          <>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Modules Generated</h3>
              <StartupSummary analysisModules={currentIdea.analysisModules} />
            </div>

            <div className="mt-6 flex gap-1 overflow-x-auto border-b border-gray-100">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                    tab === t.key ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="card mt-4 p-6">
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-display font-semibold text-gray-900">Executive Summary</h3>
                    <p className="text-sm text-gray-600">{analyses.businessplan?.executiveSummary || 'Not generated yet.'}</p>
                  </div>
                  {analyses.businessplan?.milestones?.length > 0 && (
                    <div>
                      <h3 className="mb-4 font-display font-semibold text-gray-900">Roadmap</h3>
                      <BusinessRoadmap milestones={analyses.businessplan.milestones} />
                    </div>
                  )}
                </div>
              )}
              {tab === 'swot' && <SWOTAnalysis data={analyses.swot} />}
              {tab === 'market' && <MarketAnalysisView data={analyses.market} />}
              {tab === 'competitor' && <CompetitorAnalysis data={analyses.competitor} />}
              {tab === 'investor' && <InvestorScoreView data={analyses.investor} />}
              {tab === 'revenue' && <RevenueModelView data={analyses.revenue} />}
              {tab === 'cost' && <CostEstimator data={analyses.cost} />}
              {tab === 'techstack' && <TechStackSuggestion data={analyses.techstack} />}
              {tab === 'businessplan' && <BusinessPlanView data={analyses.businessplan} />}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5">
              <div>
                <h4 className="font-display font-semibold text-gray-900">Pitch Deck</h4>
                <p className="text-sm text-gray-500">Generate investor-ready slide content and export to PPTX.</p>
              </div>
              <Button variant="secondary" icon={Presentation} onClick={() => useStartupStore.getState().generatePitchDeck(id).then(() => toast.success('Pitch deck generated'))}>
                Generate Pitch Deck
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
