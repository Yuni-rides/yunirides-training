"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronLeft, Check, Award, Lock, PlayCircle, BookOpen, ShieldCheck } from 'lucide-react';

const VideoPlayer = dynamic(() => import('@/components/training/VideoPlayer'), { ssr: false });

const initialModules = [
  { id: '01', title: 'Introduction to Yunirides', time: '1min', completed: true, videoUrl: '/videos/test-training.mp4' },
  { id: '02', title: 'Driver responsibilities', time: '5min', completed: true, videoUrl: '/videos/test-training.mp4' },
  { id: '03', title: 'Special needs transportation', time: '2min', completed: true, videoUrl: '/videos/test-training.mp4' },
  { id: '04', title: 'McKinney-vento & foster youth support', time: '3min', completed: false, videoUrl: '/videos/foster-youth.mp4' },
  { id: '05', title: 'Defensive driving', time: '4min', completed: false, videoUrl: '/videos/driving.mp4' },
  { id: '06', title: 'Vehicle inspection', time: '4min', completed: false, videoUrl: '/videos/inspection.mp4' },
  { id: '07', title: 'Emergency Procedures', time: '3min', completed: false, videoUrl: '/videos/emergency.mp4' },
];

export default function CourseDetailPage({ courseId }: { courseId: string }) {
  const [isClient, setIsClient] = useState(false);
  const [localModules, setLocalModules] = useState(initialModules);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [lastWatchedTime, setLastWatchedTime] = useState(0);

  
useEffect(() => {
  setIsClient(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [courseId]);

  const handleVideoEnded = () => {
    const updated = [...localModules];
    updated[activeLessonIndex].completed = true;
    setLocalModules(updated);
  };

  const handleProgressUpdate = (seconds: number) => {
    setLastWatchedTime(seconds);
  };

  if (!isClient) return null;

  const allCompleted = localModules.every(m => m.completed);

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/my-courses" className="p-2 hover:bg-white rounded-full transition bg-white shadow-sm border border-slate-200">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight uppercase italic">
              {localModules[activeLessonIndex].title}
            </h1>
            <p className="text-sm text-slate-500 font-medium">Training Program &bull; Module {localModules[activeLessonIndex].id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Video & Description */}
        <div className="xl:col-span-8 space-y-6">
          <div className="aspect-video bg-slate-900 rounded-[40px] overflow-hidden border-[8px] border-white shadow-2xl relative">
            <VideoPlayer 
              videoUrl={localModules[activeLessonIndex].videoUrl} 
              lastSavedTime={lastWatchedTime}
              onProgressUpdate={handleProgressUpdate}
              onVideoEnd={handleVideoEnded}
            />
          </div>

          {/* Description Area  */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-purple-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-sm">Module Overview</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 italic">About this training session</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              This module covers essential protocols for Yunirides drivers. Please watch the entire video to understand the safety requirements and operational standards. Once completed, the next module will be automatically unlocked.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-slate-800">Safety First</p>
                  <p className="text-xs text-slate-500">Learn about our driver safety and vehicle inspection protocols.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                <PlayCircle className="w-6 h-6 text-purple-500 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-slate-800">Interactive Learning</p>
                  <p className="text-xs text-slate-500">Engage with visual content and track your progress in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar & Certificate */}
        <div className="xl:col-span-4 space-y-6 ">
          {/* Modules List */}
          <div className="bg-white rounded-[40px] p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-6 px-2 italic uppercase">Course Content</h3>
            <div className="space-y-2">
              {localModules.map((m, index) => {
                const isUnlocked = index === 0 || localModules[index - 1].completed;
                const isActive = activeLessonIndex === index;

                return (
                  <div 
                    key={m.id}
                    onClick={() => isUnlocked && setActiveLessonIndex(index)}
                    className={`p-4 rounded-[24px] flex items-center gap-4 transition-all
                      ${isActive ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                      ${!isUnlocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                      ${m.completed ? 'bg-purple-600' : 'bg-slate-200'}`}>
                      {m.completed ? <Check className="w-5 h-5 text-white" /> : !isUnlocked ? <Lock className="w-4 h-4 text-slate-400" /> : <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isActive ? 'text-purple-700' : 'text-slate-700'}`}>{m.title}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{m.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate Section */}
          <div className={`p-8 rounded-[40px] transition-all duration-500 ${allCompleted ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white' : 'bg-slate-200 text-slate-400'}`}>
            <Award className={`w-12 h-12 mb-4 ${allCompleted ? 'text-yellow-300' : 'text-slate-300'}`} />
            <h3 className="font-bold text-xl mb-2 italic uppercase">Final Certificate</h3>
            <p className="text-xs mb-6 opacity-80 leading-relaxed">
              Complete all 7 lessons to unlock your official Yunirides Driver Certification.
            </p>
            <button 
              disabled={!allCompleted}
              className={`w-full py-4 rounded-[20px] font-black italic uppercase transition-all shadow-lg
                ${allCompleted ? 'bg-white text-purple-700 hover:scale-105 active:scale-95' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
            >
              {allCompleted ? 'Download Certificate' : 'Course Locked'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}