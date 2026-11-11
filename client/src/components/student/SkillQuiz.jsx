import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Check
} from 'lucide-react';

export const SkillQuiz = ({ onFinished }) => {
  const { recordQuizResults } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];
  const total = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optId) => {
    if (isAnswerRevealed) return;
    setSelectedAnswers(prev => ({ ...prev, [question.id]: optId }));
  };

  const handleConfirmAnswer = () => {
    setIsAnswerRevealed(true);
  };

  const handleNext = () => {
    setIsAnswerRevealed(false);
    if (currentIdx < total - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      finalizeQuiz();
    }
  };

  const finalizeQuiz = () => {
    setShowResults(true);

    // Calculate score
    let correctCount = 0;
    const skillBoosts = {};

    QUIZ_QUESTIONS.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected === q.correct) {
        correctCount += 1;
        skillBoosts[q.skillTarget] = (skillBoosts[q.skillTarget] || 0) + 18;
      } else {
        // Minor baseline increment
        skillBoosts[q.skillTarget] = (skillBoosts[q.skillTarget] || 0) + 4;
      }
    });

    const finalPercentage = Math.round((correctCount / total) * 100);

    // Trigger celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }

    recordQuizResults(finalPercentage, skillBoosts);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setIsAnswerRevealed(false);
  };

  if (showResults) {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correctCount += 1;
    });
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center max-w-xl mx-auto space-y-5">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
          <Award className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Assessment completed
          </span>
          <h2 className="text-xl font-semibold text-slate-900">
            Skill Diagnostics Verified
          </h2>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Your answers have been scored and updated in your verified skill profile.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-2xl font-bold font-mono text-slate-900">{correctCount} / {total}</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Questions correct</div>
          </div>
          <div className="p-3.5 rounded-lg bg-indigo-50 border border-indigo-200">
            <div className="text-2xl font-bold font-mono text-indigo-700">{percentage}%</div>
            <div className="text-xs text-indigo-700 font-medium mt-0.5">Diagnostic score</div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-left space-y-2">
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Skills updated on your profile:
          </div>
          <ul className="text-xs text-slate-600 space-y-1 pl-5 list-disc">
            {QUIZ_QUESTIONS.map(q => (
              <li key={q.id}>
                <span className="font-medium text-slate-800">{q.skillTarget}</span>: {selectedAnswers[q.id] === q.correct ? 'Verified Competent (+18 pts)' : 'Identified as Target Gap (+4 pts)'}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Quiz
          </button>
          <button
            onClick={onFinished}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs transition-colors"
          >
            <span>View Updated Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const selectedOpt = selectedAnswers[question.id];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden max-w-2xl mx-auto">
      {/* Quiz Header with progress */}
      <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              {question.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Target: <strong className="text-slate-700">{question.skillTarget}</strong>
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-1">
            Skill Diagnostic Assessment
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Question</div>
            <div className="text-xs font-bold font-mono text-slate-900">{currentIdx + 1} of {total}</div>
          </div>
          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-6 sm:p-7 space-y-5">
        <h3 className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-2.5">
          {question.options.map((option) => {
            const isSelected = selectedOpt === option.id;
            const isCorrect = option.id === question.correct;

            let borderClasses = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50';
            if (isSelected) borderClasses = 'border-indigo-600 bg-indigo-50/50';

            if (isAnswerRevealed) {
              if (isCorrect) {
                borderClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950';
              } else if (isSelected && !isCorrect) {
                borderClasses = 'border-rose-500 bg-rose-50 text-rose-950';
              } else {
                borderClasses = 'border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={isAnswerRevealed}
                className={`w-full text-left p-3.5 rounded-lg border transition-colors flex items-start gap-3 ${borderClasses}`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold transition-colors ${
                  isAnswerRevealed && isCorrect
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : isAnswerRevealed && isSelected && !isCorrect
                    ? 'bg-rose-600 border-rose-600 text-white'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-300 text-slate-600 bg-white'
                }`}>
                  {isAnswerRevealed && isCorrect ? <Check className="w-3 h-3" /> : option.id.toUpperCase()}
                </div>

                <div className="flex-1 text-xs sm:text-sm font-normal text-slate-800 leading-snug">
                  {option.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon Reveal */}
        {isAnswerRevealed && (
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              Technical explanation:
            </span>
            <p className="text-slate-600 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 sm:px-7 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={handleRestart}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium"
        >
          Reset
        </button>

        <div className="flex items-center gap-3">
          {!isAnswerRevealed ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={!selectedOpt}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                selectedOpt
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Submit Answer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <span>{currentIdx < total - 1 ? 'Next question' : 'Complete assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
