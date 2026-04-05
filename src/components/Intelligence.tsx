import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp,
  ArrowUpRight,
  Mic,
  FileText,
  Play,
  Target,
  Plus,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from 'recharts';
import { cn, formatCurrency } from '../lib/utils';
import { SalesTarget } from '../types';

const initialTargets: SalesTarget[] = [
  { id: '1', role: 'founder', target: 500000, current: 385000, period: 'quarterly', label: 'Company Revenue' },
  { id: '2', role: 'sales_leader', target: 200000, current: 165000, period: 'monthly', label: 'Team Pipeline' },
  { id: '3', role: 'sdr_ae', target: 50000, current: 42000, period: 'monthly', label: 'Individual Quota' },
];

const pipelineHistory = [
  { name: 'Jan', value: 400000 },
  { name: 'Feb', value: 450000 },
  { name: 'Mar', value: 420000 },
  { name: 'Apr', value: 600000 },
  { name: 'May', value: 850000 },
  { name: 'Jun', value: 950000 },
];

export default function Intelligence() {
  const [isRecording, setIsRecording] = useState(false);
  const [targets, setTargets] = useState<SalesTarget[]>(initialTargets);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [newTarget, setNewTarget] = useState<Partial<SalesTarget>>({
    role: 'founder',
    period: 'monthly',
    target: 0,
    current: 0,
    label: ''
  });

  const handleAddTarget = () => {
    if (!newTarget.label || !newTarget.target) return;
    
    const target: SalesTarget = {
      id: Math.random().toString(36).substr(2, 9),
      role: newTarget.role as any,
      period: newTarget.period as any,
      target: Number(newTarget.target),
      current: Number(newTarget.current) || 0,
      label: newTarget.label as string
    };

    setTargets([...targets, target]);
    setIsTargetModalOpen(false);
    setNewTarget({
      role: 'founder',
      period: 'monthly',
      target: 0,
      current: 0,
      label: ''
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Executive Intelligence <BrainCircuit className="w-6 h-6 text-indigo-600" />
          </h1>
          <p className="text-slate-500">High-density command center for BMI enterprise operations.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter">Live Intelligence Active</span>
          </div>
          <button 
            onClick={() => setIsTargetModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Target className="w-4 h-4" />
            Set Targets
          </button>
        </div>
      </header>

      {/* High-Density Executive Command Center */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg border border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-16 h-16" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Enterprise Value</p>
            <h3 className="text-2xl font-black tracking-tight">$12.4M</h3>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">+14.2%</span>
              <span className="text-[10px] text-slate-500 font-medium">vs last quarter</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Prowtech Account Status</p>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Strategic</h3>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-black uppercase">Upsell Ready</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">Health Score</span>
                <span className="text-emerald-600">94/100</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[94%]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Upsell Pipeline</p>
            <h3 className="text-xl font-bold text-slate-900">$2.8M</h3>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                    AE
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-bold">8 Active Deals</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">AI Recommendation</p>
            <p className="text-xs font-bold leading-tight">Prowtech headcount expansion detected. Trigger "Enterprise Expansion" sequence immediately.</p>
          </div>
          <button className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-2">
            Execute Sequence <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Sales Target Tracking Section */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Sales Target Tracking
              </h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wider">Q2 2024</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {targets.map((target) => {
                const progress = (target.current / target.target) * 100;
                return (
                  <div key={target.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{target.label}</p>
                        <h4 className="text-lg font-bold text-slate-900 capitalize">{target.role.replace('_', ' ')}</h4>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-[10px] font-bold uppercase",
                        progress >= 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Current: {formatCurrency(target.current)}</span>
                        <span className="font-bold text-slate-900">{formatCurrency(target.target)}</span>
                      </div>
                      <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            progress >= 80 ? "bg-emerald-500" : "bg-indigo-500"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={targets} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="label" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="current" radius={[0, 8, 8, 0]} barSize={32}>
                    {targets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#6366f1'} />
                    ))}
                  </Bar>
                  <Bar dataKey="target" fill="#f1f5f9" radius={[0, 8, 8, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-100">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Pipeline Growth</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pipelineHistory}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Target Distribution</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={targets}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="target"
                      >
                        {targets.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'][index % 4]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* Meeting Agent Section */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <Mic className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">AI Meeting Assistant</h3>
                  <p className="text-sm text-slate-500">Capture and analyze your sales calls.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                  isRecording 
                    ? "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse" 
                    : "bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
                )}
              >
                {isRecording ? <><div className="w-2 h-2 bg-rose-600 rounded-full" /> Recording...</> : <><Play className="w-4 h-4 fill-white" /> Start Meeting Agent</>}
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-4 text-indigo-600">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Latest Summary: Acme Corp Discovery</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  The client is looking for a multi-user intelligence layer that integrates with their existing CRM. 
                  Key pain points identified: data silos between sales and HR, lack of automated lead scoring.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Budget: $100k+', 'Timeline: Q3', 'Decision Maker: CTO'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Recommendations */}
          <section className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Strategic Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Upsell Opportunity', desc: 'Metacortex headcount grew by 20% this month. Suggest Enterprise tier.', icon: TrendingUp },
                { title: 'Churn Risk', desc: 'Cyberdyne Systems has 3 open high-priority tickets. Immediate outreach needed.', icon: BrainCircuit },
              ].map((rec, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 transition-all group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                    <rec.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{rec.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{rec.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold mb-4">Business Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Pipeline Health</span>
                  <span>Good</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Hiring Velocity</span>
                  <span>On Track</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              View Full Report <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">AI Insights Feed</h3>
            <div className="space-y-6">
              {[
                { text: 'New lead from Metacortex scores 95/100.', time: '10m ago' },
                { text: 'Sales velocity increased by 15% this week.', time: '1h ago' },
                { text: 'Capacity alert: AE team at 95% capacity.', time: '3h ago' },
              ].map((insight, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-700 leading-snug">{insight.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{insight.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SetTargetModal 
        isOpen={isTargetModalOpen}
        onClose={() => setIsTargetModalOpen(false)}
        onAdd={handleAddTarget}
        newTarget={newTarget}
        setNewTarget={setNewTarget}
      />
    </div>
  );
}

function SetTargetModal({ 
  isOpen, 
  onClose, 
  onAdd, 
  newTarget, 
  setNewTarget 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: () => void;
  newTarget: Partial<SalesTarget>;
  setNewTarget: (t: Partial<SalesTarget>) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Set Sales Target</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
            <Plus className="w-5 h-5 rotate-45" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Target Label</label>
            <input 
              type="text" 
              placeholder="e.g. Q3 Enterprise Revenue" 
              className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
              value={newTarget.label}
              onChange={(e) => setNewTarget({ ...newTarget, label: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                value={newTarget.role}
                onChange={(e) => setNewTarget({ ...newTarget, role: e.target.value as any })}
              >
                <option value="founder">Founder</option>
                <option value="sales_leader">Sales Leader</option>
                <option value="sdr_ae">SDR/AE</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Period</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                value={newTarget.period}
                onChange={(e) => setNewTarget({ ...newTarget, period: e.target.value as any })}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Target Amount</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                value={newTarget.target}
                onChange={(e) => setNewTarget({ ...newTarget, target: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Current Progress</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                value={newTarget.current}
                onChange={(e) => setNewTarget({ ...newTarget, current: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
            Cancel
          </button>
          <button onClick={onAdd} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
            Set Target
          </button>
        </div>
      </motion.div>
    </div>
  );
}
