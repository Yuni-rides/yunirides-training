"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

// Mock Data: Isay aap API se replace karoge
const QUIZ_DATA = {
  title: "Safety & Emergency Protocols",
  questions: [
    {
      id: 1,
      text: "What is the first step when you encounter a medical emergency on-board?",
      options: [
        "Call your family immediately",
        "Pull over safely and assess the situation",
        "Keep driving to the destination",
        "Open all windows"
      ],
      correct: 1
    },
    // ... aur questions add karein
  ]
};

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const currentQ = QUIZ_DATA.questions[currentIdx];
  const progress = ((currentIdx + 1) / QUIZ_DATA.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <button className="flex items-center gap-2 text-slate-500 hover:text-[#2C3979] font-bold">
          <ArrowLeft size={18} /> Back to Course
        </button>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {QUIZ_DATA.title}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-2 bg-slate-200 rounded-full mb-8">
        <div 
          className="h-full bg-[#2C3979] rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quiz Card */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-[#2C3979] mb-6">
          Q{currentIdx + 1}: {currentQ.text}
        </h2>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between ${
                selected === idx 
                  ? "border-[#2C3979] bg-[#EFF2FF]" 
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <span className="font-medium text-slate-700">{option}</span>
              {selected === idx && <CheckCircle2 size={20} className="text-[#2C3979]" />}
            </button>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex justify-between">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="px-6 py-2 rounded-xl text-slate-400 font-bold disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="bg-[#2C3979] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#1e2a5a] transition-all"
          >
            {currentIdx === QUIZ_DATA.questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}