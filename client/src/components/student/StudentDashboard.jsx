import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillGapAnalyzer } from './SkillGapAnalyzer';
import { SkillQuiz } from './SkillQuiz';
import { VerifiedPortfolio } from './VerifiedPortfolio';
import { StudentJobs } from './StudentJobs';
import { ResumeSkillExtractor } from './ResumeSkillExtractor';
import {
  Compass,
  FileBadge,
  FileText,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';

export const StudentDashboard = () => {
  const { student, jobs } = useApp();
  const [activeTab, setActiveTab] = useState('gap'); // 'gap' | 'quiz' | 'resume' | 'portfolio' | 'jobs'

  const studentSkills = student?.skills || {};
  const studentSkillsCount = Object.keys(studentSkills).length;
  const readySkillsCount = Object.values(studentSkills).filter(v => v >= 75).length;
  const readinessScoreVal = student?.readinessScore ?? student?.readiness_score ?? 0;
  const verifiedProjectsCount = (student?.verifiedProjects || student?.verified_projects || []).length;
  const matchedJobsCount = (jobs || []).length;

  return (
    <div className="space-y-6">
      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">{readinessScoreVal}%</div>
            <div className="text-xs text-slate-500 font-medium">Career readiness score</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">{readySkillsCount} / {studentSkillsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Industry-ready skills</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileBadge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">{verifiedProjectsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Verified projects tracked</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">{matchedJobsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Matched openings</div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex border border-slate-200 bg-white p-1 rounded-xl shadow-xs overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('gap')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
            activeTab === 'gap'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Skill gap analyzer</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Take skill assessment</span>
        </button>

        <button
          onClick={() => setActiveTab('resume')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
            activeTab === 'resume'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resume skill extractor</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileBadge className="w-4 h-4" />
          <span>Verified digital portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
            activeTab === 'jobs'
              ? 'bg-slate-900 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Matched openings ({jobs.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'gap' && (
        <SkillGapAnalyzer onStartQuiz={() => setActiveTab('quiz')} />
      )}

      {activeTab === 'quiz' && (
        <SkillQuiz onFinished={() => setActiveTab('gap')} />
      )}

      {activeTab === 'resume' && (
        <ResumeSkillExtractor onNavigateToRadar={() => setActiveTab('gap')} />
      )}

      {activeTab === 'portfolio' && (
        <VerifiedPortfolio />
      )}

      {activeTab === 'jobs' && (
        <StudentJobs />
      )}
    </div>
  );
};
