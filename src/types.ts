export type UserRole = 'founder' | 'sales_leader' | 'sdr_ae' | 'hr' | 'support';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  teamId?: string;
  photoURL?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  accountId: string;
  title?: string;
  department?: string;
  leadSource?: string;
  isPrimary?: boolean;
  linkedIn?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  website?: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'junk' | 'lost' | 'converted';
  score: number;
  source: string;
  industry?: string;
  annualRevenue?: number;
  employees?: number;
  assignedTo?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  website?: string;
  phone?: string;
  employees?: number;
  annualRevenue?: number;
  healthScore: number;
  ownerId: string;
  billingAddress?: string;
}

export interface Deal {
  id: string;
  title: string;
  accountId: string;
  contactId?: string;
  amount: number;
  stage: 'qualification' | 'needs_analysis' | 'value_proposition' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  leadSource?: string;
  nextStep?: string;
}

export interface Ticket {
  id: string;
  accountId: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: string;
}

export interface Employee {
  uid: string;
  role: string;
  managerId?: string;
  department: string;
  performanceRating: number;
  capacity: number;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  associations: { type: 'lead' | 'account' | 'deal' | 'contact'; id: string }[];
  createdBy: string;
  createdAt: string;
}

export interface SalesTarget {
  id: string;
  role: UserRole;
  target: number;
  current: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  label: string;
}
