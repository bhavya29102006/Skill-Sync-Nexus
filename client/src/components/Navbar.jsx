import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  School,
  RotateCcw,
  ShieldCheck,
  LogIn,
  UserCheck,
  Play
} from 'lucide-react';

export const Navbar = () => {
  const { role, setRole, student, resetAllData, isLiveBackend, setIsAuthModalOpen, currentUser } = useApp();

  const roleConfigs = [
    {
      id: 'student',
      label: 'Student Portal',
      icon: GraduationCap
    },
    {
      id: 'industry',
      label: 'Industry / Recruiter',
      icon: Briefcase
    },
    {
      id: 'faculty',
      label: 'Academician / Faculty',
      icon: BookOpen
    },
    {
      id: 'institution',
      label: 'Institution / Dean',
      icon: School
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white border border-indigo-700/50 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  SkillSync <span className="text-indigo-600 font-semibold">Nexus</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  Verified bridge
                </span>
                {isLiveBackend && (
                  <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    API connected
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Connecting students, industry, faculty, and institutions
              </p>
            </div>
          </div>

          {/* Interactive Persona Switcher Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 overflow-x-auto">
            {roleConfigs.map((config) => {
              const Icon = config.icon;
              const isActive = role === config.id;
              return (
                <button
                  key={config.id}
                  onClick={() => setRole(config.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Tools & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/demo-video.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
              title="Watch Full Prototype Video Demo"
            >
              <Play className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span className="hidden sm:inline">Watch demo</span>
            </a>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Authentication & Role Login Gateway"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Sign in / Register</span>
            </button>

            <button
              onClick={resetAllData}
              title="Reset Demo Data"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md text-xs font-medium border border-transparent hover:border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>

            {role === 'student' && (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                title="Account Settings & Profile Switcher"
                className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-85 transition-opacity text-left cursor-pointer"
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-8 h-8 rounded-full ring-1 ring-slate-200 object-cover"
                />
                <div className="hidden xl:block text-left text-xs">
                  <div className="font-semibold text-slate-800 leading-tight flex items-center gap-1">
                    {student.name}
                    <UserCheck className="w-3 h-3 text-indigo-500" />
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    {student.readinessScore}% ready
                  </div>
                </div>
              </button>
            )}

            {role === 'industry' && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Recruiter portal
              </div>
            )}

            {role === 'faculty' && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 text-xs font-medium text-purple-800">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                Academician hub
              </div>
            )}

            {role === 'institution' && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                Apex Inst. Dean
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
