import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Building2,
  ChevronRight,
  Star,
  UserCircle,
  LayoutGrid,
  List,
  Download,
  Upload,
  Mail,
  Phone,
  Calendar,
  Tag,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Target,
  TrendingUp,
  LifeBuoy,
  ArrowLeft,
  ExternalLink,
  History,
  Briefcase,
  PieChart,
  BarChart3,
  Users,
  DollarSign,
  ArrowRightLeft,
  BrainCircuit
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { Lead, Deal, Account, Contact, Ticket, Activity } from '../types';
import { AICoach } from './AICoach';

type CRMModule = 'dashboard' | 'leads' | 'contacts' | 'accounts' | 'deals' | 'activities';

const mockLeads: Lead[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Connor', email: 'sarah@skynet.com', company: 'Cyberdyne Systems', status: 'qualified', score: 92, source: 'LinkedIn', createdAt: '2024-03-20', industry: 'Technology', annualRevenue: 5000000 },
  { id: '2', firstName: 'Thomas', lastName: 'Anderson', email: 'neo@matrix.io', company: 'Metacortex', status: 'new', score: 75, source: 'Website', createdAt: '2024-03-21', industry: 'Software' },
  { id: '3', firstName: 'Bruce', lastName: 'Wayne', email: 'bruce@wayne.ent', company: 'Wayne Enterprises', status: 'contacted', score: 98, source: 'Referral', createdAt: '2024-03-19', industry: 'Defense' },
  { id: '4', firstName: 'Alex', lastName: 'Vance', email: 'alex@prowtech.com', company: 'Prowtech', status: 'qualified', score: 95, source: 'Direct', createdAt: '2024-04-01', industry: 'Infrastructure' },
];

const mockDeals: Deal[] = [
  { id: '1', title: 'Enterprise License', accountId: '1', amount: 120000, stage: 'proposal', probability: 70, expectedCloseDate: '2024-06-30', leadSource: 'LinkedIn' },
  { id: '2', title: 'Cloud Migration', accountId: '2', amount: 45000, stage: 'qualification', probability: 20, expectedCloseDate: '2024-08-15', nextStep: 'Discovery Call' },
  { id: '3', title: 'Prowtech Expansion', accountId: '3', amount: 2800000, stage: 'negotiation', probability: 85, expectedCloseDate: '2024-05-15', nextStep: 'Final Contract Review' },
];

const mockAccounts: Account[] = [
  { id: '1', name: 'Cyberdyne Systems', industry: 'Technology', healthScore: 85, ownerId: '1', website: 'cyberdyne.com', employees: 500, phone: '+1-555-0199', annualRevenue: 50000000 },
  { id: '2', name: 'Metacortex', industry: 'Software', healthScore: 92, ownerId: '1', website: 'metacortex.io', employees: 1200, phone: '+1-555-0123', annualRevenue: 120000000 },
  { id: '3', name: 'Prowtech', industry: 'Infrastructure', healthScore: 94, ownerId: '1', website: 'prowtech.com', employees: 2500, phone: '+1-555-9999', annualRevenue: 450000000 },
];

const mockContacts: Contact[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Connor', email: 'sarah@skynet.com', accountId: '1', title: 'Director of Security', createdAt: '2024-01-15' },
  { id: '2', firstName: 'John', lastName: 'Connor', email: 'john@skynet.com', accountId: '1', title: 'Lead Architect', createdAt: '2024-02-10' },
  { id: '3', firstName: 'Thomas', lastName: 'Anderson', email: 'neo@matrix.io', accountId: '2', title: 'Senior Developer', createdAt: '2024-03-01' },
];

const mockTickets: Ticket[] = [
  { id: '1', accountId: '1', subject: 'API Integration Failure', status: 'open', priority: 'high', createdAt: '2024-03-22' },
  { id: '2', accountId: '1', subject: 'Billing Query', status: 'resolved', priority: 'low', createdAt: '2024-03-15' },
  { id: '3', accountId: '2', subject: 'New User Onboarding', status: 'in_progress', priority: 'medium', createdAt: '2024-03-20' },
];

const mockActivities: Activity[] = [
  { id: '1', type: 'call', title: 'Follow-up Call', createdAt: '2024-03-22', description: 'Discussed proposal details', associations: [{ type: 'account', id: '1' }, { type: 'deal', id: '1' }], createdBy: '1' },
  { id: '2', type: 'meeting', title: 'Onsite Demo', createdAt: '2024-03-25', description: 'Product walkthrough with stakeholders', associations: [{ type: 'account', id: '1' }], createdBy: '1' },
  { id: '3', type: 'email', title: 'Initial Outreach', createdAt: '2024-03-20', description: 'Sent introduction email to Sarah', associations: [{ type: 'lead', id: '1' }], createdBy: '1' },
  { id: '4', type: 'note', title: 'Deal Strategy', createdAt: '2024-03-21', description: 'Focus on enterprise features for this deal', associations: [{ type: 'deal', id: '1' }, { type: 'account', id: '1' }], createdBy: '1' },
];

const stageColors: Record<string, string> = {
  qualification: 'bg-slate-100 text-slate-600',
  needs_analysis: 'bg-blue-50 text-blue-600',
  value_proposition: 'bg-indigo-50 text-indigo-600',
  proposal: 'bg-amber-50 text-amber-600',
  negotiation: 'bg-orange-50 text-orange-600',
  closed_won: 'bg-emerald-50 text-emerald-600',
  closed_lost: 'bg-rose-50 text-rose-600',
};

export default function CRM() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeModule = (location.pathname.split('/')[2] || 'dashboard') as CRMModule;
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isLoggingActivity, setIsLoggingActivity] = useState(false);
  const [activityContext, setActivityContext] = useState<{ type: 'lead' | 'account' | 'deal' | 'contact'; id: string } | null>(null);
  const [isConvertingLead, setIsConvertingLead] = useState<string | null>(null);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<{
    type: 'call' | 'email' | 'meeting' | 'note';
    title: string;
    description: string;
    associations: { type: 'lead' | 'account' | 'deal' | 'contact'; id: string }[];
  }>({
    type: 'call',
    title: '',
    description: '',
    associations: []
  });

  useEffect(() => {
    if (isLoggingActivity && activityContext) {
      const initialAssocs = [activityContext];
      
      // Auto-associate parent account if applicable
      if (activityContext.type === 'deal') {
        const deal = deals.find(d => d.id === activityContext.id);
        if (deal && deal.accountId) {
          initialAssocs.push({ type: 'account', id: deal.accountId });
        }
      } else if (activityContext.type === 'contact') {
        const contact = mockContacts.find(c => c.id === activityContext.id);
        if (contact && contact.accountId) {
          initialAssocs.push({ type: 'account', id: contact.accountId });
        }
      }

      setNewActivity(prev => ({
        ...prev,
        associations: initialAssocs
      }));
    } else if (!isLoggingActivity) {
      setNewActivity({
        type: 'call',
        title: '',
        description: '',
        associations: []
      });
    }
  }, [isLoggingActivity, activityContext]);

  const handleSaveActivity = () => {
    if (!newActivity.title) return;

    const activity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      ...newActivity,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setActivities(prev => [activity, ...prev]);
    setIsLoggingActivity(false);
  };

  const handleProbabilityChange = (dealId: string, newProbability: number) => {
    setDeals(prevDeals => prevDeals.map(deal => 
      deal.id === dealId ? { ...deal, probability: Math.min(100, Math.max(0, newProbability)) } : deal
    ));
  };

  const renderAssociations = (associations: { type: string; id: string }[], currentId: string) => {
    const others = associations.filter(a => a.id !== currentId);
    if (others.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-1.5">
        {others.map((assoc, idx) => {
          let label = '';
          let Icon = Building2;
          if (assoc.type === 'account') {
            label = mockAccounts.find(a => a.id === assoc.id)?.name || 'Account';
            Icon = Building2;
          } else if (assoc.type === 'deal') {
            label = deals.find(d => d.id === assoc.id)?.title || 'Deal';
            Icon = Briefcase;
          } else if (assoc.type === 'lead') {
            const lead = mockLeads.find(l => l.id === assoc.id);
            label = lead ? `${lead.firstName} ${lead.lastName}` : 'Lead';
            Icon = Target;
          } else if (assoc.type === 'contact') {
            const contact = mockContacts.find(c => c.id === assoc.id);
            label = contact ? `${contact.firstName} ${contact.lastName}` : 'Contact';
            Icon = UserCircle;
          }

          return (
            <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[9px] font-bold uppercase tracking-tight border border-slate-100">
              <Icon className="w-2.5 h-2.5" />
              {label}
            </span>
          );
        })}
      </div>
    );
  };

  const modules: { id: CRMModule; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'leads', label: 'Leads', icon: Target },
    { id: 'contacts', label: 'Contacts', icon: UserCircle },
    { id: 'accounts', label: 'Accounts', icon: Building2 },
    { id: 'deals', label: 'Deals', icon: Briefcase },
    { id: 'activities', label: 'Activities', icon: Calendar },
  ];

  if (selectedContactId) {
    const contact = mockContacts.find(c => c.id === selectedContactId);
    if (!contact) return null;

    const account = mockAccounts.find(a => a.id === contact.accountId);
    const contactActivities = activities.filter(a => a.associations.some(assoc => assoc.type === 'contact' && assoc.id === contact.id));

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedContactId(null)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{contact.firstName} {contact.lastName}</h2>
              <p className="text-sm text-slate-500">{contact.title} at {account?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Email</span>
                  <span className="font-bold text-slate-900">{contact.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phone</span>
                  <span className="font-bold text-slate-900">{contact.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Department</span>
                  <span className="font-bold text-slate-900">{contact.department || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-500" />
                <button 
                  onClick={() => {
                    setActivityContext({ type: 'contact', id: contact.id });
                    setIsLoggingActivity(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Log Activity
                </button>
              </h3>
              <div className="space-y-4">
                {contactActivities.map(activity => (
                  <div key={activity.id} className="relative pl-6 pb-4 border-l border-slate-100 last:pb-0">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
                    <p className="text-xs font-bold text-slate-900">{activity.title}</p>
                    <p className="text-[10px] text-slate-500 mb-1">{activity.createdAt}</p>
                    <p className="text-[10px] text-slate-400">{activity.description}</p>
                    {renderAssociations(activity.associations, contact.id)}
                  </div>
                ))}
                {contactActivities.length === 0 && (
                  <p className="text-sm text-slate-400 italic">No activities recorded for this contact.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedLeadId) {
    const lead = mockLeads.find(l => l.id === selectedLeadId);
    if (!lead) return null;

    const leadActivities = activities.filter(a => a.associations.some(assoc => assoc.type === 'lead' && assoc.id === lead.id));
    const stages = ['new', 'contacted', 'qualified'];
    const currentStageIndex = stages.indexOf(lead.status);

    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Zoho-style Record Header */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedLeadId(null)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-all text-slate-400"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg">
              {lead.firstName[0]}{lead.lastName[0]}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">{lead.firstName} {lead.lastName}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{lead.company}</span>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-[10px] font-medium text-slate-500">{lead.email}</span>
              </div>
            </div>
          </div>

          {/* Zero-Click Insights Bar */}
          <div className="hidden xl:flex items-center gap-6 px-6 border-x border-slate-100">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Lead Score</p>
              <p className={cn("text-sm font-black", lead.score > 80 ? "text-emerald-600" : "text-amber-600")}>{lead.score}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Last Activity</p>
              <p className="text-sm font-bold text-slate-700">2h ago</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Intent Signal</p>
              <div className="flex items-center gap-1 text-indigo-600">
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm font-black">High</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <div className="h-6 w-px bg-slate-100 mx-1" />
            <button 
              className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm"
              onClick={() => setIsConvertingLead(lead.id)}
            >
              Convert
            </button>
          </div>
        </div>

        {/* Progress Tracker (Lifecycle) */}
        <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage}>
              <div className={cn(
                "flex-1 flex items-center justify-center py-1.5 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                idx <= currentStageIndex 
                  ? "bg-indigo-50 text-indigo-600" 
                  : "text-slate-300"
              )}>
                {idx < currentStageIndex ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <div className={cn("w-1.5 h-1.5 rounded-full mr-2", idx === currentStageIndex ? "bg-indigo-600 animate-pulse" : "bg-slate-200")} />}
                {stage}
              </div>
              {idx < stages.length - 1 && <ChevronRight className="w-3 h-3 text-slate-200 mx-1" />}
            </React.Fragment>
          ))}
        </div>

        {/* Three-Pane Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Pane 1: Lead Information (3/12) */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Lead Information</h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">Edit</button>
              </div>
              <div className="p-4 space-y-4">
                {[
                  { label: 'Industry', value: lead.industry || 'Technology' },
                  { label: 'Annual Revenue', value: formatCurrency(lead.annualRevenue || 0) },
                  { label: 'Lead Source', value: lead.source },
                  { label: 'Owner', value: 'Alex Vance' },
                  { label: 'Created', value: lead.createdAt },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.label}</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Contact Info</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-600 truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-600">+1 (555) 000-0000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pane 2: Activity & Timeline (6/12) */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="text-[11px] font-black text-indigo-600 border-b-2 border-indigo-600 pb-3 -mb-3 uppercase tracking-wider">Timeline</button>
                  <button className="text-[11px] font-black text-slate-400 hover:text-slate-600 pb-3 -mb-3 uppercase tracking-wider">Notes</button>
                  <button className="text-[11px] font-black text-slate-400 hover:text-slate-600 pb-3 -mb-3 uppercase tracking-wider">Emails</button>
                </div>
                <button 
                  onClick={() => {
                    setActivityContext({ type: 'lead', id: lead.id });
                    setIsLoggingActivity(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Log Activity
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {leadActivities.map((activity, idx) => (
                  <div key={activity.id} className="relative pl-8 group">
                    {idx !== leadActivities.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-slate-100" />
                    )}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {activity.type === 'call' ? <Phone className="w-3 h-3" /> : activity.type === 'meeting' ? <Calendar className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{activity.title}</p>
                        <span className="text-[10px] font-bold text-slate-400">{activity.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{activity.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
                {leadActivities.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <History className="w-12 h-12 opacity-10 mb-4" />
                    <p className="text-sm font-medium italic">No activity history found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pane 3: Zia AI Insights (3/12) */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all" />
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h3 className="text-[11px] font-black uppercase tracking-widest text-indigo-200">Zia AI Insights</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Sentiment Analysis</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[85%]" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-400">Positive</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-tighter mb-1">Next Best Action</p>
                  <p className="text-[11px] font-bold leading-snug">Send "Enterprise Infrastructure" case study. Lead mentioned Prowtech expansion in last call.</p>
                </div>

                <div className="space-y-3">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Upsell Triggers</p>
                  {[
                    { label: 'Headcount Growth', value: '+12%', icon: Users },
                    { label: 'Tech Stack Match', value: '98%', icon: Target },
                  ].map((trigger, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <trigger.icon className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-medium text-slate-300">{trigger.label}</span>
                      </div>
                      <span className="text-[10px] font-black text-white">{trigger.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                Ask Zia
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Associated Deals</h3>
              </div>
              <div className="p-4">
                <p className="text-[10px] text-slate-400 italic">No deals associated with this lead yet.</p>
                <button className="w-full mt-3 py-2 border border-dashed border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                  + Create Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedDealId) {
    const deal = deals.find(d => d.id === selectedDealId);
    if (!deal) return null;

    const dealActivities = activities.filter(a => a.associations.some(assoc => assoc.type === 'deal' && assoc.id === deal.id));

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedDealId(null)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{deal.title}</h2>
            <p className="text-sm text-slate-500">{formatCurrency(deal.amount)} • {deal.stage.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1">
            {['qualification', 'needs_analysis', 'proposal', 'negotiation', 'closed_won'].map((stage, idx) => {
              const stages = ['qualification', 'needs_analysis', 'proposal', 'negotiation', 'closed_won'];
              const currentIdx = stages.indexOf(deal.stage);
              const isCompleted = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              
              return (
                <div key={stage} className="flex-1 group relative">
                  <div className={cn(
                    "h-2 rounded-full transition-all",
                    isCompleted ? "bg-emerald-500" : isCurrent ? "bg-indigo-600" : "bg-slate-100"
                  )} />
                  <div className="mt-2 flex flex-col items-center">
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-wider",
                      isCurrent ? "text-indigo-600" : "text-slate-400"
                    )}>
                      {stage.replace('_', ' ')}
                    </span>
                  </div>
                  {isCurrent && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-sm" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Deal Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Probability</span>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      min="0"
                      max="100"
                      value={deal.probability}
                      onChange={(e) => handleProbabilityChange(deal.id, parseInt(e.target.value) || 0)}
                      className="w-12 text-right font-bold text-indigo-600 bg-indigo-50 border-none rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="font-bold text-indigo-600">%</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Closing Date</span>
                  <span className="font-bold text-slate-900">{deal.expectedCloseDate}</span>
                </div>
              </div>
            </div>
            <AICoach context={deal} type="deal" />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-500" />
                  Activity History
                </div>
                <button 
                  onClick={() => {
                    setActivityContext({ type: 'deal', id: deal.id });
                    setIsLoggingActivity(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Log Activity
                </button>
              </h3>
              <div className="space-y-4">
                {dealActivities.map(activity => (
                  <div key={activity.id} className="relative pl-6 pb-4 border-l border-slate-100 last:pb-0">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
                    <p className="text-xs font-bold text-slate-900">{activity.title}</p>
                    <p className="text-[10px] text-slate-500 mb-1">{activity.createdAt}</p>
                    <p className="text-[10px] text-slate-400">{activity.description}</p>
                    {renderAssociations(activity.associations, deal.id)}
                  </div>
                ))}
                {dealActivities.length === 0 && (
                  <p className="text-sm text-slate-400 italic">No activities recorded for this deal.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (selectedAccountId) {
    const account = mockAccounts.find(a => a.id === selectedAccountId);
    if (!account) return null;

    const accountDeals = deals.filter(d => d.accountId === account.id);
    const accountContacts = mockContacts.filter(c => c.accountId === account.id);
    const accountTickets = mockTickets.filter(t => t.accountId === account.id);
    const accountActivities = activities.filter(a => a.associations.some(assoc => assoc.type === 'account' && assoc.id === account.id));

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedAccountId(null)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">{account.name}</h2>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                account.healthScore > 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>
                Health: {account.healthScore}%
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              {account.industry} • {account.website}
              <ExternalLink className="w-3 h-3" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Account Info & Contacts */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-indigo-500" />
                Key Contacts
              </h3>
              <div className="space-y-4">
                {accountContacts.map(contact => (
                  <div key={contact.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{contact.firstName} {contact.lastName}</p>
                        <p className="text-[10px] text-slate-500">{contact.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600">
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-500" />
                  Recent Activities
                </div>
                <button 
                  onClick={() => {
                    setActivityContext({ type: 'account', id: account.id });
                    setIsLoggingActivity(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Log
                </button>
              </h3>
              <div className="space-y-4">
                {accountActivities.map(activity => (
                  <div key={activity.id} className="relative pl-6 pb-4 border-l border-slate-100 last:pb-0">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
                    <p className="text-xs font-bold text-slate-900">{activity.title}</p>
                    <p className="text-[10px] text-slate-500 mb-1">{activity.createdAt}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{activity.description}</p>
                    {renderAssociations(activity.associations, account.id)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deals & Tickets */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  Active Deals
                </h3>
                <span className="text-xs font-bold text-slate-400">{accountDeals.length} Deals</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountDeals.map(deal => (
                  <div key={deal.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-indigo-100 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-slate-900">{deal.title}</h4>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        stageColors[deal.stage]
                      )}>
                        {deal.stage.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 mb-3">{formatCurrency(deal.amount)}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", deal.probability > 70 ? "bg-emerald-500" : deal.probability > 40 ? "bg-amber-500" : "bg-rose-500")}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="number"
                          min="0"
                          max="100"
                          value={deal.probability}
                          onChange={(e) => handleProbabilityChange(deal.id, parseInt(e.target.value) || 0)}
                          className="w-8 text-[10px] font-bold text-slate-700 bg-transparent border-none focus:ring-0 p-0 text-right"
                        />
                        <span className="text-[10px] font-bold text-slate-700">%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-indigo-500" />
                  Support Tickets
                </h3>
                <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {accountTickets.map(ticket => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        ticket.priority === 'high' ? "bg-rose-500" : "bg-amber-500"
                      )} />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{ticket.subject}</p>
                        <p className="text-[10px] text-slate-500">#{ticket.id} • Opened {ticket.createdAt}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      ticket.status === 'open' ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                    )}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Zoho-style Top Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            {modules.find(m => m.id === activeModule)?.icon && (
              React.createElement(modules.find(m => m.id === activeModule)!.icon, { className: "w-5 h-5 text-indigo-600" })
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 capitalize">{activeModule}</h2>
            <p className="text-xs text-slate-500 font-medium">
              {activeModule === 'leads' ? mockLeads.length : activeModule === 'deals' ? deals.length : 0} Records
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${activeModule}...`}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="flex border border-slate-200 rounded-xl overflow-hidden">
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2 transition-colors", viewMode === 'list' ? "bg-slate-100 text-indigo-600" : "bg-white text-slate-400")}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('kanban')}
              className={cn("p-2 transition-colors", viewMode === 'kanban' ? "bg-slate-100 text-indigo-600" : "bg-white text-slate-400")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
            {isQuickCreateOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 py-2 overflow-hidden">
                {modules.filter(m => m.id !== 'dashboard' && m.id !== 'activities').map(mod => (
                  <button 
                    key={mod.id}
                    onClick={() => {
                      setIsQuickCreateOpen(false);
                      alert(`Create new ${mod.label}`);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <mod.icon className="w-4 h-4" />
                    New {mod.label.slice(0, -1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          {/* Header moved to top toolbar */}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "overflow-hidden",
        activeModule === 'dashboard' ? "" : "bg-white rounded-3xl border border-slate-200 shadow-sm"
      )}>
        {activeModule === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: '$1.2M', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Active Deals', value: '24', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'New Leads', value: '156', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Win Rate', value: '68%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-2 rounded-xl", stat.bg)}>
                      <stat.icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">This Month</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-500" />
                    Revenue Forecast
                  </h3>
                  <select className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-lg focus:ring-0">
                    <option>Quarterly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="h-64 flex items-end gap-4 px-2">
                  {[40, 65, 45, 90, 55, 75, 60].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        className="w-full bg-indigo-100 rounded-t-lg group-hover:bg-indigo-500 transition-all relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ${height}k
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">M{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-500" />
                  Lead Sources
                </h3>
                <div className="flex items-center justify-center h-64 relative">
                  <div className="w-48 h-48 rounded-full border-[16px] border-slate-50 relative">
                    <div className="absolute inset-0 rounded-full border-[16px] border-indigo-500 border-t-transparent border-r-transparent rotate-45" />
                    <div className="absolute inset-0 rounded-full border-[16px] border-amber-400 border-b-transparent border-l-transparent -rotate-12" />
                  </div>
                  <div className="absolute flex flex-col items-center">
                    <p className="text-2xl font-black text-slate-900">156</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Leads</p>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Direct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Social</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Other</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModule === 'leads' && viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="w-12 px-6 py-4"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Name</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Status</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Source</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLeadId(lead.id)}
                    className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {lead.firstName} {lead.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 font-medium">{lead.company}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{lead.email}</td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        lead.status === 'qualified' ? "bg-emerald-100 text-emerald-700" :
                        lead.status === 'contacted' ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{lead.source}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{lead.industry || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeModule === 'deals' && viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="w-12 px-6 py-4"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Deal Name</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stage</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Probability</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Closing Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {deals.map((deal) => (
                  <tr 
                    key={deal.id} 
                    onClick={() => setSelectedDealId(deal.id)}
                    className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {deal.title}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-900 font-bold">{formatCurrency(deal.amount)}</td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        stageColors[deal.stage] || "bg-slate-100 text-slate-500"
                      )}>
                        {deal.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", deal.probability > 70 ? "bg-emerald-500" : deal.probability > 40 ? "bg-amber-500" : "bg-rose-500")}
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="number"
                            min="0"
                            max="100"
                            value={deal.probability}
                            onChange={(e) => handleProbabilityChange(deal.id, parseInt(e.target.value) || 0)}
                            className="w-10 text-xs font-bold text-slate-700 bg-transparent border-none focus:ring-0 p-0 text-right"
                          />
                          <span className="text-xs font-bold text-slate-700">%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{deal.expectedCloseDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeModule === 'deals' && viewMode === 'kanban' && (
          <div className="p-6 flex gap-6 overflow-x-auto min-h-[600px] bg-slate-50/50">
            {['qualification', 'needs_analysis', 'proposal', 'negotiation', 'closed_won'].map((stage) => (
              <div key={stage} className="flex-shrink-0 w-80">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 capitalize text-sm">{stage.replace('_', ' ')}</h3>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {deals.filter(d => d.stage === stage).length}
                    </span>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-600" />
                </div>
                <div className="space-y-3">
                  {deals.filter(d => d.stage === stage).map((deal) => (
                    <div 
                      key={deal.id} 
                      onClick={() => setSelectedDealId(deal.id)}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-grab active:cursor-grabbing group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{deal.title}</h4>
                        <Star className="w-3.5 h-3.5 text-slate-300 hover:text-amber-400 cursor-pointer" />
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-lg font-bold text-slate-900">{formatCurrency(deal.amount)}</p>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100" onClick={(e) => e.stopPropagation()}>
                          <TrendingUp className="w-3 h-3 text-indigo-500" />
                          <input 
                            type="number"
                            min="0"
                            max="100"
                            value={deal.probability}
                            onChange={(e) => handleProbabilityChange(deal.id, parseInt(e.target.value) || 0)}
                            className="w-8 text-[10px] font-bold text-slate-700 bg-transparent border-none focus:ring-0 p-0 text-right"
                          />
                          %
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500 font-medium">
                          {mockAccounts.find(a => a.id === deal.accountId)?.name || 'Unknown Account'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{deal.expectedCloseDate}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                          JF
                        </div>
                      </div>
                    </div>
                  ))}
                  {deals.filter(d => d.stage === stage).length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs italic">
                      No deals in this stage
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder for other modules */}
        {activeModule === 'accounts' && viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="w-12 px-6 py-4"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Health Score</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employees</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockAccounts.map((account) => (
                  <tr 
                    key={account.id} 
                    onClick={() => setSelectedAccountId(account.id)}
                    className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {account.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 font-medium">{account.industry}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", account.healthScore > 80 ? "bg-emerald-500" : "bg-amber-500")}
                            style={{ width: `${account.healthScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{account.healthScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">{account.annualRevenue ? formatCurrency(account.annualRevenue) : '-'}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{account.employees || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeModule === 'activities' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">All Activities</h3>
              <button 
                onClick={() => {
                  setActivityContext(null);
                  setIsLoggingActivity(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <Plus className="w-4 h-4" /> Log Activity
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {activities.map(activity => (
                <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                    <span className="text-[10px] font-bold text-slate-400">{activity.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{activity.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.associations.map((assoc, idx) => {
                      let label = '';
                      let Icon = Building2;
                      if (assoc.type === 'account') {
                        label = mockAccounts.find(a => a.id === assoc.id)?.name || 'Account';
                        Icon = Building2;
                      } else if (assoc.type === 'deal') {
                        label = deals.find(d => d.id === assoc.id)?.title || 'Deal';
                        Icon = Briefcase;
                      } else if (assoc.type === 'lead') {
                        const lead = mockLeads.find(l => l.id === assoc.id);
                        label = lead ? `${lead.firstName} ${lead.lastName}` : 'Lead';
                        Icon = Target;
                      }
                      return (
                        <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase tracking-tight">
                          <Icon className="w-2 h-2" />
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'contacts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="w-12 px-6 py-4"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Name</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockContacts.map((contact) => {
                  const account = mockAccounts.find(a => a.id === contact.accountId);
                  return (
                    <tr 
                      key={contact.id} 
                      onClick={() => setSelectedContactId(contact.id)}
                      className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </div>
                          <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {contact.firstName} {contact.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 font-medium">{account?.name || '-'}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{contact.email}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{contact.phone || '-'}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{contact.title}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isLoggingActivity && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Log New Activity</h3>
              <button onClick={() => setIsLoggingActivity(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Activity Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {['call', 'email', 'meeting', 'note'].map(type => (
                    <button 
                      key={type} 
                      onClick={() => setNewActivity(prev => ({ ...prev, type: type as any }))}
                      className={cn(
                        "py-2 rounded-xl border text-xs font-bold capitalize transition-all",
                        newActivity.type === type 
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600" 
                          : "border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Follow-up Call" 
                  value={newActivity.title}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea 
                  placeholder="Notes about the activity..." 
                  value={newActivity.description}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 min-h-[100px]" 
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase">Associations</label>
                  <select 
                    className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border-none rounded-lg px-2 py-1 focus:ring-0"
                    onChange={(e) => {
                      const [type, id] = e.target.value.split(':');
                      if (type && id && !newActivity.associations.some(a => a.id === id)) {
                        setNewActivity(prev => ({
                          ...prev,
                          associations: [...prev.associations, { type: type as any, id }]
                        }));
                      }
                      e.target.value = '';
                    }}
                  >
                    <option value="">+ Add Association</option>
                    <optgroup label="Leads">
                      {mockLeads.map(l => <option key={l.id} value={`lead:${l.id}`}>{l.firstName} {l.lastName}</option>)}
                    </optgroup>
                    <optgroup label="Accounts">
                      {mockAccounts.map(a => <option key={a.id} value={`account:${a.id}`}>{a.name}</option>)}
                    </optgroup>
                    <optgroup label="Deals">
                      {deals.map(d => <option key={d.id} value={`deal:${d.id}`}>{d.title}</option>)}
                    </optgroup>
                  </select>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto p-1">
                  {newActivity.associations.map((assoc, idx) => {
                    let label = '';
                    let Icon = Building2;
                    if (assoc.type === 'account') {
                      label = mockAccounts.find(a => a.id === assoc.id)?.name || 'Account';
                      Icon = Building2;
                    } else if (assoc.type === 'deal') {
                      label = deals.find(d => d.id === assoc.id)?.title || 'Deal';
                      Icon = Briefcase;
                    } else if (assoc.type === 'lead') {
                      const lead = mockLeads.find(l => l.id === assoc.id);
                      label = lead ? `${lead.firstName} ${lead.lastName}` : 'Lead';
                      Icon = Target;
                    } else if (assoc.type === 'contact') {
                      const contact = mockContacts.find(c => c.id === assoc.id);
                      label = contact ? `${contact.firstName} ${contact.lastName}` : 'Contact';
                      Icon = UserCircle;
                    }
                    return (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-indigo-50 rounded-xl border border-indigo-100">
                        <Icon className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-medium text-indigo-700">{label} ({assoc.type})</span>
                        <button 
                          onClick={() => setNewActivity(prev => ({ ...prev, associations: prev.associations.filter((_, i) => i !== idx) }))}
                          className="ml-auto text-indigo-400 hover:text-indigo-600"
                        >
                          <Plus className="w-3 h-3 rotate-45" />
                        </button>
                      </div>
                    );
                  })}
                  {newActivity.associations.length === 0 && (
                    <p className="text-[10px] text-slate-400 italic">No associations added. Activities logged from record views are automatically associated.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3">
              <button onClick={() => setIsLoggingActivity(false)} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                Cancel
              </button>
              <button 
                onClick={handleSaveActivity} 
                disabled={!newActivity.title}
                className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {isConvertingLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Convert Lead</h3>
              <button onClick={() => setIsConvertingLead(null)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Ready to convert</p>
                  <p className="text-xs text-slate-500">This will create a new Account, Contact, and Deal.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Create New Account</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">Cyberdyne Systems</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <UserCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Create New Contact</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">Sarah Connor</span>
                </div>
                <div className="p-4 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-bold text-slate-900">Create a new Deal for this Account</span>
                  </div>
                  <div className="pl-6 space-y-3">
                    <input type="text" placeholder="Deal Name" className="w-full px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" defaultValue="Cyberdyne Systems - Phase 1" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Amount" className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" defaultValue="$50,000" />
                      <input type="date" className="px-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3">
              <button onClick={() => setIsConvertingLead(null)} className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                Cancel
              </button>
              <button onClick={() => setIsConvertingLead(null)} className="flex-1 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                Convert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

