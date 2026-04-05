import { 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  UserPlus,
  BarChart3,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Employee } from '../types';

const mockEmployees: Employee[] = [
  { uid: '1', role: 'Account Executive', department: 'Sales', performanceRating: 4.8, capacity: 85 },
  { uid: '2', role: 'SDR', department: 'Sales', performanceRating: 4.2, capacity: 95 },
  { uid: '3', role: 'HR Manager', department: 'People', performanceRating: 4.9, capacity: 60 },
];

export default function HRMS() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">People & HRMS</h1>
          <p className="text-slate-500">Manage talent, performance, and capacity.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Headcount', value: '24', icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Avg Performance', value: '4.6', icon: Award, color: 'text-amber-600 bg-amber-50' },
          { label: 'Open Roles', value: '3', icon: Clock, color: 'text-indigo-600 bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Team Directory</h3>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {mockEmployees.map((emp, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                  {emp.role[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">Employee {emp.uid}</p>
                  <p className="text-sm text-slate-500">{emp.role} • {emp.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Performance</p>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Award className="w-4 h-4 fill-amber-500" />
                    <span className="font-bold">{emp.performanceRating}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Capacity</p>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", emp.capacity > 90 ? "bg-rose-500" : "bg-indigo-500")}
                      style={{ width: `${emp.capacity}%` }}
                    />
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
