import { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Target, 
  ArrowRight,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function LeadGen() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Lead Generation <Sparkles className="w-6 h-6 text-indigo-600" />
          </h1>
          <p className="text-slate-500">Automated lead capture and scoring engine.</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
        >
          <RefreshCcw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
          {isSyncing ? 'Syncing Sources...' : 'Sync All Sources'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-32 h-32 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">AI Lead Scoring Engine</h3>
            <p className="text-slate-500 mb-8 max-w-md">Our intelligence layer automatically scores leads based on firmographics, behavior, and intent data.</p>
            
            <div className="space-y-4">
              {[
                { label: 'High Intent (Score > 80)', count: 24, color: 'bg-emerald-500' },
                { label: 'Warm (Score 50-80)', count: 56, color: 'bg-indigo-500' },
                { label: 'Cold (Score < 50)', count: 12, color: 'bg-slate-300' },
              ].map((group, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-slate-700">{group.label}</span>
                      <span className="text-slate-500">{group.count} leads</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", group.color)} style={{ width: `${(group.count / 92) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                Top Sources
              </h4>
              <div className="space-y-4">
                {['LinkedIn Ads', 'Organic Search', 'Referral Program', 'Webinar'].map((source, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{source}</span>
                    <span className="text-sm font-bold text-slate-900">{Math.floor(Math.random() * 50) + 10}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                Auto-Routing Rules
              </h4>
              <div className="space-y-3">
                {['Enterprise -> AE Team', 'SMB -> SDR Queue', 'EMEA -> Regional Team'].map((rule, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
          <h3 className="text-xl font-bold">Connected Sources</h3>
          <div className="space-y-4">
            {[
              { name: 'Apollo.io', status: 'Connected', icon: 'A' },
              { name: 'LinkedIn Sales Nav', status: 'Connected', icon: 'L' },
              { name: 'HubSpot Marketing', status: 'Connected', icon: 'H' },
              { name: 'Custom Webhooks', status: 'Active', icon: 'W' },
            ].map((source, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-indigo-400">
                    {source.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{source.name}</p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{source.status}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all mt-4">
            Connect New Source
          </button>
        </div>
      </div>
    </div>
  );
}
