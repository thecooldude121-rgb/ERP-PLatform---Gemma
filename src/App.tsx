import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Target, 
  BrainCircuit, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  TrendingUp,
  Users2,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  LayoutGrid,
  Building2,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from './lib/utils';
import { User, UserRole } from './types';

// Module Components
import CRM from './components/CRM';
import HRMS from './components/HRMS';
import LeadGen from './components/LeadGen';
import Intelligence from './components/Intelligence';

const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 67000 },
];

// Mock Auth Hook
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockUser: User = {
        uid: '1',
        email: 'founder@bmi.os',
        displayName: 'John Founder',
        role: 'founder',
      };
      setUser(mockUser);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { user, loading, logout: () => setUser(null) };
};

const SidebarItem = ({ to, icon: Icon, label, active }: any) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
        : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:text-indigo-600")} />
    <span className="font-medium">{label}</span>
  </Link>
);

const AppLauncher = ({ isOpen, onClose, apps }: any) => {
  if (!isOpen) return null;

  const coreApps = apps.filter((app: any) => ['hrms', 'leads', 'intelligence'].includes(app.id));
  const otherApps = apps.filter((app: any) => !['hrms', 'leads', 'intelligence'].includes(app.id));

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-end p-4 pt-20 pointer-events-none">
      <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] pointer-events-auto" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden pointer-events-auto"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">App Launcher</h3>
            <p className="text-[10px] text-slate-500 font-medium">Switch between BMI OS modules</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 shadow-sm border border-transparent hover:border-slate-100 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Ecosystem</p>
              <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 text-[8px] font-black rounded uppercase tracking-tighter">SSO Active</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {coreApps.map((app: any) => (
                <Link 
                  key={app.id} 
                  to={app.to} 
                  onClick={onClose}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-indigo-50 transition-all group border border-transparent hover:border-indigo-100 relative"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-sm">
                    <app.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900">{app.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{app.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Individual Modules</p>
            <div className="grid grid-cols-2 gap-3">
              {otherApps.map((app: any) => (
                <Link 
                  key={app.id} 
                  to={app.to} 
                  onClick={onClose}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100 relative"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 transition-colors shadow-sm">
                    <app.icon className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  {app.id === 'crm' && (
                    <span className="absolute top-2 right-2 px-1 py-0.5 bg-emerald-100 text-emerald-600 text-[6px] font-black rounded uppercase tracking-tighter">Integrated</span>
                  )}
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900">{app.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{app.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BMI OS v2.4</p>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500">All Systems Nominal</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const APP_MODULES: Record<string, any[]> = {
  dashboard: [
    { to: '/', icon: LayoutDashboard, label: 'Overview' },
  ],
  crm: [
    { to: '/crm', icon: LayoutDashboard, label: 'CRM Dashboard' },
    { to: '/crm/leads', icon: Target, label: 'Leads' },
    { to: '/crm/contacts', icon: Users, label: 'Contacts' },
    { to: '/crm/accounts', icon: Building2, label: 'Accounts' },
    { to: '/crm/deals', icon: Briefcase, label: 'Deals' },
    { to: '/crm/activities', icon: History, label: 'Activities' },
  ],
  hrms: [
    { to: '/hrms', icon: LayoutDashboard, label: 'HRMS Dashboard' },
    { to: '/hrms/employees', icon: Users, label: 'Employees' },
    { to: '/hrms/performance', icon: TrendingUp, label: 'Performance' },
  ],
  leads: [
    { to: '/leads', icon: LayoutDashboard, label: 'Lead Gen Dashboard' },
    { to: '/leads/sources', icon: Target, label: 'Sources' },
    { to: '/leads/scoring', icon: BrainCircuit, label: 'Scoring' },
  ],
  intelligence: [
    { to: '/intelligence', icon: LayoutDashboard, label: 'Intelligence Dashboard' },
    { to: '/intelligence/insights', icon: BrainCircuit, label: 'Insights' },
    { to: '/intelligence/forecasts', icon: TrendingUp, label: 'Forecasts' },
  ]
};

const Layout = ({ children, user, logout }: { children: React.ReactNode, user: User, logout: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);
  const location = useLocation();

  const currentApp = location.pathname.startsWith('/crm') ? 'crm' :
                     location.pathname.startsWith('/hrms') ? 'hrms' :
                     location.pathname.startsWith('/leads') ? 'leads' :
                     location.pathname.startsWith('/intelligence') ? 'intelligence' : 'dashboard';

  const navItems = APP_MODULES[currentApp] || APP_MODULES.dashboard;

  const apps = [
    { id: 'hrms', name: 'HRMS', icon: Briefcase, to: '/hrms', description: 'Human Resource Management' },
    { id: 'leads', name: 'Lead Gen', icon: Target, to: '/leads', description: 'Lead Generation & Tracking' },
    { id: 'intelligence', name: 'Intelligence', icon: BrainCircuit, to: '/intelligence', description: 'AI Business Intelligence' },
    { id: 'crm', name: 'CRM', icon: Users, to: '/crm', description: 'Relationship Management' },
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, to: '/', description: 'Business Overview' },
    { id: 'settings', name: 'Settings', icon: Settings, to: '#', description: 'System Configuration' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xl font-bold text-slate-900 tracking-tight block">BMI OS</span>
            {['hrms', 'leads', 'intelligence'].includes(currentApp) && (
              <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded uppercase tracking-tighter">SSO Active</span>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={item.to === '/' || item.to === '/crm' || item.to === '/hrms' || item.to === '/leads' || item.to === '/intelligence' 
                ? location.pathname === item.to 
                : location.pathname.startsWith(item.to)} 
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
              ) : (
                <span className="text-slate-500 font-bold">{user.displayName[0]}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.displayName}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <BrainCircuit className="text-indigo-600 w-6 h-6" />
          <span className="font-bold text-slate-900">BMI OS</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAppLauncherOpen(!isAppLauncherOpen)}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 right-0 left-72 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 items-center justify-end z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAppLauncherOpen(!isAppLauncherOpen)}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">{user.displayName}</p>
              <p className="text-[10px] text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              {user.displayName[0]}
            </div>
          </div>
        </div>
      </header>

      <AppLauncher 
        isOpen={isAppLauncherOpen} 
        onClose={() => setIsAppLauncherOpen(false)} 
        apps={apps}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-16">
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const Dashboard = () => (
  <div className="space-y-8">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, John</h1>
        <p className="text-slate-500 mt-1">Here's what's happening across your business today.</p>
      </div>
      <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">
        <BrainCircuit className="w-4 h-4" />
        AI Insight: Pipeline is up 12% vs last month
      </div>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Revenue', value: '$1.2M', change: '+12.5%', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Active Deals', value: '42', change: '+5', icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
        { label: 'New Leads', value: '128', change: '+18%', icon: Target, color: 'bg-indigo-50 text-indigo-600' },
        { label: 'Team Capacity', value: '84%', change: '-2%', icon: Users2, color: 'bg-amber-50 text-amber-600' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-xl", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <span className={cn("text-sm font-medium", stat.change.startsWith('+') ? "text-emerald-600" : "text-rose-600")}>
              {stat.change}
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-900">Revenue Forecast</h3>
          <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
            View Details <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4f46e5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activities</h3>
        <div className="space-y-6">
          {[
            { title: 'Meeting with Acme Corp', time: '2 hours ago', user: 'Sarah Miller', icon: MessageSquare },
            { title: 'Deal closed: Metacortex', time: '5 hours ago', user: 'Thomas Anderson', icon: TrendingUp },
            { title: 'New lead: Bruce Wayne', time: 'Yesterday', user: 'System', icon: Target },
            { title: 'Performance review', time: 'Yesterday', user: 'HR Team', icon: Briefcase },
          ].map((activity, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                <activity.icon className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                <p className="text-xs text-slate-500">{activity.time} • {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  </div>
);

export default function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <BrainCircuit className="w-12 h-12 text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-indigo-100">
            <BrainCircuit className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome to BMI OS</h1>
          <p className="text-slate-500 mb-10">The intelligence layer for your business. Please sign in to continue.</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} logout={logout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crm/*" element={<CRM />} />
          <Route path="/hrms/*" element={<HRMS />} />
          <Route path="/leads/*" element={<LeadGen />} />
          <Route path="/intelligence/*" element={<Intelligence />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
