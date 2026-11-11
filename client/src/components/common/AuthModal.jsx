import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  LogIn,
  User,
  Lock,
  Mail,
  School,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, handleLogin, handleRegister, notify } = useApp();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('student');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCollege, setRegCollege] = useState('');
  const [regRole, setRegRole] = useState('Full-Stack Software Engineer');

  if (!isAuthModalOpen) return null;

  const onQuickDemoLogin = (role, email) => {
    setLoginRole(role);
    setLoginEmail(email);
    setLoginPassword('demo123');
    notify(`Demo credentials populated for ${role.toUpperCase()} role. Click Sign In!`, 'info');
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(loginEmail, loginPassword, loginRole);
    setLoading(false);
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleRegister({
      name: regName || 'Bhavya Gupta',
      email: regEmail || 'bhavyagupta2906@gmail.com',
      password: regPassword || 'demo123',
      college: regCollege || 'UIET Panjab University, Chandigarh',
      department: 'Electronics & Communication Engineering (ECE)',
      targetRole: regRole
    });
    setLoading(false);
  };

  const autoFillNewStudent = () => {
    setRegName('Bhavya Gupta');
    setRegEmail('bhavyagupta2906@gmail.com');
    setRegPassword('demo123');
    setRegCollege('UIET Panjab University, Chandigarh');
    setRegRole('Full-Stack Software Engineer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative border-b border-slate-800">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white border border-indigo-500/40">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight flex items-center gap-2">
                SkillSync Nexus <span className="text-slate-300 text-xs font-normal px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Auth Gateway</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Authentication and role access gateway
              </p>
            </div>
          </div>

          {/* Quick Demo One-Click Access */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              1-Click demo login
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => onQuickDemoLogin('student', 'bhavyagupta2906@gmail.com')}
                className="px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors text-center"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => onQuickDemoLogin('industry', 'recruiter@techcorp.io')}
                className="px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors text-center"
              >
                Recruiter
              </button>
              <button
                type="button"
                onClick={() => onQuickDemoLogin('faculty', 'faculty@nexus.edu')}
                className="px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors text-center"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => onQuickDemoLogin('institution', 'dean@apex.edu')}
                className="px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors text-center"
              >
                Dean
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3">
          <button
            onClick={() => setTab('login')}
            className={`pb-3 px-4 text-xs font-medium transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign in to account
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-3 px-4 text-xs font-medium transition-colors border-b-2 ${
              tab === 'register'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Register student profile
          </button>
        </div>

        {/* Forms Body */}
        <div className="p-6">
          {tab === 'login' ? (
            <form onSubmit={onLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Role / Portal
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['student', 'industry', 'faculty', 'institution'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setLoginRole(r)}
                      className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize border transition-colors ${
                        loginRole === r
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                    placeholder="student@nexus.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Connected to Express API
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={onRegisterSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-slate-500">Quick Testing:</span>
                <button
                  type="button"
                  onClick={autoFillNewStudent}
                  className="text-xs font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 transition-colors flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Auto-fill demo student
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                    placeholder="e.g. Bhavya Garg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Student Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                      placeholder="bhavya@nexus.edu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  College / University
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={regCollege}
                    onChange={(e) => setRegCollege(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                    placeholder="Apex Institute of Technology"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Target Specialization Track
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white"
                  >
                    <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                    <option value="Cloud & Platform DevOps">Cloud & Platform DevOps</option>
                    <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                    <option value="Data Engineer & Analytics">Data Engineer & Analytics</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  Auto-creates verified ledger
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Register profile'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
