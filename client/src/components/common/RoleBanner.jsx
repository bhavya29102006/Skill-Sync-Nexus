import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Briefcase, BookOpen, School } from 'lucide-react';

export const RoleBanner = () => {
  const { role } = useApp();

  const roleMeta = {
    student: {
      title: 'Student Growth & Verification Hub',
      badge: 'Continuous career readiness',
      description: 'Take adaptive skill assessments, identify gap areas against target industry benchmarks, and build a verified digital portfolio backed by college faculty.',
      badgeStyle: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/25',
      iconBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/20',
      icon: GraduationCap
    },
    industry: {
      title: 'Industry Recruitment & Benchmark Hub',
      badge: 'Verified competency matching',
      description: 'Define technical benchmarks, evaluate candidates ranked by proctored assessment scores with explainable AI rationale, and source verified talent directly.',
      badgeStyle: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25',
      iconBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
      icon: Briefcase
    },
    faculty: {
      title: 'Academician & Industry Collaboration Hub',
      badge: 'Curriculum-industry alignment',
      description: 'Review and co-sign student capstone projects to eliminate counterfeit certificates, track cohort milestones, and connect with corporate research problem statements.',
      badgeStyle: 'bg-purple-500/15 text-purple-300 border-purple-400/25',
      iconBg: 'bg-purple-500/15 text-purple-300 border-purple-400/20',
      icon: BookOpen
    },
    institution: {
      title: 'Institutional Dean & Accreditation Dashboard',
      badge: 'Batch-wide placement intelligence',
      description: 'Track department-level placement readiness through the Placement Readiness Index (PRI) and analyze curriculum gap heatmaps to update course syllabi on time.',
      badgeStyle: 'bg-amber-500/15 text-amber-300 border-amber-400/25',
      iconBg: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
      icon: School
    }
  };

  const current = roleMeta[role] || roleMeta.student;
  const Icon = current.icon;

  return (
    <div className="relative rounded-xl bg-slate-900 text-white p-6 sm:p-7 mb-8 border border-slate-800 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${current.badgeStyle}`}>
              <Icon className="w-3.5 h-3.5" />
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">• Active persona</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            {current.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            {current.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <div className={`p-3 rounded-lg border ${current.iconBg}`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
};
