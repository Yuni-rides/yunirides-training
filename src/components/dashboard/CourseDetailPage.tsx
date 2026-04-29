"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { ChevronLeft, Clock, Check, Award } from 'lucide-react';

const VideoPlayer = dynamic(() => import('@/components/training/VideoPlayer'), { ssr: false });

const modules = [
  { id: '01', title: 'Introduction to Yunirides', time: '1min', completed: true },
  { id: '02', title: 'Driver responsibilities', time: '5min', completed: false },
  { id: '03', title: 'Special needs transportation', time: '2min', completed: false },
  { id: '04', title: 'McKinney-vento & foster youth support', time: '3min', completed: false },
  { id: '05', title: 'Defensive driving', time: '4min', completed: false },
  { id: '06', title: 'Vehicle inspection', time: '4min', completed: false },
  { id: '07', title: 'Emergency Procedures', time: '3min', completed: false },
];

export default function CourseDetailPage({ courseId }: { courseId: string }) {
  const [isClient, setIsClient] = useState(false);
  const [driverId, setDriverId] = useState<string | null>(null);
  const [lastWatchedTime, setLastWatchedTime] = useState(0);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedUserStr = localStorage.getItem('user');
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        setDriverId(savedUser?.id || savedUser?.driverId || null);
      }
    } catch (e) {
      console.log("LocalStorage error ignored");
    }
  }, []);

  const handleProgressUpdate = (seconds: number) => {
    setLastWatchedTime(seconds);
    // Backend call yahan se hata di hai taake live crash na ho
  };
    // Agar Vercel par hain toh backend sync skip karein
    const handleVideoEnded = async () => {
  // 1. Pehle token check karein (Login check)
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("User not logged in. Skipping sync.");
    return;
  }

  // 2. Driver ID ko optional rakhein
  // Agar driverId nahi hai, toh crash karne ki bajaye bas return kar jaye
  if (!driverId) {
    console.warn("Login successful but Driver ID not found yet. Progress won't sync to DB.");
    return; 
  }

  // 3. Request sirf tab jaye jab hum Localhost par hon (Vercel safety)
  const isLocal = window.location.hostname === 'localhost';
if (!token || !driverId) return;

  try {
    // Localhost wala URL hata kar live wala dal dein
    await axios.patch(
      `https://api.yunirides.com/api/drivers/${driverId}/training-progress`,
      { courseId, status: 'COMPLETED', percentage: 100 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Progress synced to live server!");
  } catch (err) {
    console.log("Live sync failed", err);
  }
};
  if (!isClient) return null;

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/my-courses" className="p-2 hover:bg-gray-100 rounded-full transition bg-white shadow-sm">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">My courses</p>
          <h1 className="text-xl font-bold text-slate-800">Yunirides training module {courseId}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="xl:col-span-8 space-y-6">
          <div className="relative aspect-video bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white min-h-[400px]">
            <VideoPlayer 
              videoUrl="/videos/test-training.mp4" 
              lastSavedTime={lastWatchedTime} 
              onProgressUpdate={handleProgressUpdate} 
              onVideoEnd={handleVideoEnded}
            />
          </div>

          {/* Course Content Text */}
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Welcome to Yunirides Training</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Welcome to the official training program. Every driver plays a vital role in our mission.</p>
              <div className="pt-4">
                <h3 className="font-bold text-slate-900 mb-2">In this course you will learn:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Company Culture</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Safety Expectations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 px-2">Course Modules</h3>
            <div className="space-y-1">
              {modules.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex items-start gap-4 p-3 rounded-2xl transition-all cursor-pointer ${m.completed ? 'bg-purple-50' : 'hover:bg-slate-50'}`}
                >
                  <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${m.completed ? 'bg-purple-600 border-purple-600' : 'border-slate-300 bg-white'}`}>
                    {m.completed && <Check className="w-4 h-4 text-white stroke-[3px]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-tight ${m.completed ? 'text-purple-900' : 'text-slate-700'}`}>
                      <span className="inline-block w-5 text-slate-400 font-normal">{m.id}</span>
                      {m.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-tighter">{m.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2 group">
              <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Get certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}