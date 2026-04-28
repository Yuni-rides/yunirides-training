"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import VideoPlayer from '@/components/training/VideoPlayer'; // Path check karlein
import { ChevronLeft, Check, Award, Clock } from 'lucide-react'; // Clock add kiya hai

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
  const [user, setUser] = useState<any>(null);
  const [driverId, setDriverId] = useState<string | null>(null);
  const [lastWatchedTime, setLastWatchedTime] = useState(0);
  const playerRef = useRef<any>(null);

useEffect(() => {
    // 1. LocalStorage se user uthayein
    const savedUserStr = localStorage.getItem('user');
    
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      const id = savedUser?.id || savedUser?.driverId;
      
      setUser(savedUser);
      setDriverId(id);
      console.log("User found:", id);
    } else {
      // 2. Sirf tab login par bhejein agar waqai data missing ho
      console.log("No user in localStorage, redirecting...");
      // window.location.href = '/login'; // <--- Abhi ke liye isay comment kar dein check karne ke liye
    }
  }, []);

  const handleProgressUpdate = (seconds: number) => {
    if (seconds > lastWatchedTime + 2) {
      console.log("Anti-Skip: Seek blocked");
      return;
    }
    setLastWatchedTime(seconds);
  };

  const handleVideoEnded = async () => {
    const token = localStorage.getItem('token');
    if (!driverId) return;

    try {
      console.log("Video Finished! Syncing with Backend...");
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/drivers/${driverId}/training-progress`,
        { 
          courseId: courseId,
          status: 'COMPLETED',
          percentage: 100 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Progress saved successfully");
    } catch (err: any) {
      console.error("Backend Sync Error:", err.response?.data);
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/my-courses" className="p-2 hover:bg-gray-100 rounded-full transition bg-white shadow-sm">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">My courses</p>
          <h1 className="text-xl font-bold text-slate-800">Yunirides new driver training module {courseId}</h1>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course 1 welcome to Yunirides</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Welcome to the Yunirides Driver Training Program. This course introduces you to our mission...</p>
              <p>At Yunirides, every driver plays a vital role in ensuring that students arrive safely...</p>
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
          
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[32px] p-6 text-white text-center">
            <h4 className="font-bold mb-2 text-lg">Need help?</h4>
            <p className="text-sm text-purple-100 mb-4">Our support team is available 24/7 for driver assistance.</p>
            <button className="bg-white/20 hover:bg-white/30 transition-colors w-full py-2 rounded-xl text-sm font-semibold backdrop-blur-md">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}