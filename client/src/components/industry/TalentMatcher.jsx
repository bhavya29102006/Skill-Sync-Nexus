import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Send,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Explainable AI (XAI) Candidate Evaluation Insight
const getCandidateXAIExplanation = (candidate, jobSkills, matchScore) => {
  const reqEntries = Object.entries(jobSkills || {});
  const candSkills = candidate.skills || {};
  const strong = [];
  const deficits = [];

  for (const [skill, benchmark] of reqEntries) {
    const score = candSkills[skill] || 0;
    if (score >= benchmark) {
      strong.push(skill);
    } else {
      deficits.push({ skill, diff: benchmark - score });
    }
  }

  deficits.sort((a, b) => b.diff - a.diff);

  if (matchScore >= 75) {
    const strongStr = strong.slice(0, 2).join(' & ');
    const gapStr = deficits.length > 0 ? ` Minor gap in ${deficits[0].skill} (${deficits[0].diff}% below target).` : '';
    return `Top recommended candidate: Exceeds benchmark thresholds in ${strongStr || 'core competencies'} with ${candidate.verifiedProjectsCount} verified project submissions.${gapStr}`;
  } else if (matchScore >= 60) {
    return `Viable candidate: Solid domain understanding with ${strong.length} benchmarked skills. Has a ${deficits[0]?.diff || 15}% gap in ${deficits[0]?.skill || 'advanced modules'}, solvable via quick onboarding.`;
  } else {
    return `Requires bridging: Identified skill delta in ${deficits.slice(0, 2).map(d => d.skill).join(' & ')}. Recommended for pre-hire training track rather than direct interview.`;
  }
};

export const TalentMatcher = () => {
  const { jobs, candidates, calculateMatchScore, notify } = useApp();
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);
  const [invitedMap, setInvitedMap] = useState({});

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Calculate ranking of all candidates for the currently selected job
  const rankedCandidates = (candidates || []).map(cand => {
    const jobSkills = activeJob?.requiredSkills || activeJob?.required_skills || {};
    const matchScore = calculateMatchScore(cand.skills, jobSkills);
    return {
      ...cand,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleSendInvite = (candName) => {
    setInvitedMap(prev => ({ ...prev, [candName]: true }));
    notify(`Interview invitation dispatched to ${candName} via SkillSync Verified Pipe!`, 'success');
  };

  const toggleExpand = (id) => {
    setExpandedCandidateId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Selector & Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Automated skill-fit ranker
          </span>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mt-2">
            Verified Candidates for Active Role
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Candidates ranked by verified assessment scores and project evaluations.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-600 shrink-0">Hiring For:</label>
          <select
            value={selectedJobId}
            onChange={e => setSelectedJobId(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Required Skill Thresholds Strip */}
      {activeJob && (
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-medium text-emerald-300">
              Evaluating against benchmark:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(activeJob?.requiredSkills || activeJob?.required_skills || {}).map(([skill, req]) => (
              <span
                key={skill}
                className="text-[11px] font-mono bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10 text-slate-200"
              >
                {skill}: <strong className="text-emerald-400">≥{req}%</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ranked Candidate List */}
      <div className="space-y-4">
        {rankedCandidates.map((candidate, rankIdx) => {
          const isExpanded = expandedCandidateId === candidate.id;
          const isShortlisted = candidate.matchScore >= (activeJob?.verifiedMatchThreshold || 70);
          const hasBeenInvited = !!invitedMap[candidate.name];

          return (
            <div
              key={candidate.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors overflow-hidden"
            >
              {/* Summary Header */}
              <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  {/* Rank indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    rankIdx === 0
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    #{rankIdx + 1}
                  </div>

                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-11 h-11 rounded-lg object-cover ring-1 ring-slate-200"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                        {candidate.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified skills
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {candidate.department} • {candidate.college} (Class of {candidate.batchYear}) • CGPA: {candidate.cgpa}
                    </p>
                  </div>
                </div>

                {/* Score & Action Buttons */}
                <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500 font-medium">Verified match</div>
                    <div className={`text-xl font-bold font-mono ${
                      isShortlisted ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {candidate.matchScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpand(candidate.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1"
                      title="Inspect Skills"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Details</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleSendInvite(candidate.name)}
                      disabled={hasBeenInvited}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        hasBeenInvited
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      {hasBeenInvited ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Invite Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Invite to Interview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Drawer */}
              {isExpanded && (
                <div className="bg-slate-50 p-5 sm:p-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-700">
                      Evaluated skill match vs role requirements:
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Trust Hash: 0x{candidate.id.split('-')[1]}...verified
                    </span>
                  </div>

                  {/* Skills comparative bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeJob.requiredSkills).map(([skill, benchmark]) => {
                      const candidateLevel = candidate.skills[skill] || 0;
                      const meetsBenchmark = candidateLevel >= benchmark;

                      return (
                        <div key={skill} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-800">{skill}</span>
                            <span className={`font-mono font-semibold ${meetsBenchmark ? 'text-emerald-700' : 'text-amber-700'}`}>
                              {candidateLevel}% / {benchmark}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
                            <div
                              className={`h-full rounded-full ${meetsBenchmark ? 'bg-emerald-600' : 'bg-amber-600'}`}
                              style={{ width: `${candidateLevel}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explainable AI Candidate Match Rationale */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Candidate match rationale (Explainable AI):</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {getCandidateXAIExplanation(candidate, activeJob.requiredSkills, candidate.matchScore)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      {candidate.verifiedProjectsCount} verified projects • {candidate.credentialsCount} faculty certifications
                    </span>
                    <span className="text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {candidate.readinessTier}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
