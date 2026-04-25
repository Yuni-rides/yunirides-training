"use client";
import { ChevronLeft, Play, Check, Award, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage({ courseId }: { courseId: string }) {
  const modules = [
    { id: '01', title: 'Introduction to Yunirides', time: '1min', completed: true },
    { id: '02', title: 'Driver responsibilities', time: '5min', completed: false },
    { id: '03', title: 'Special needs transportation', time: '2min', completed: false },
    { id: '04', title: 'McKinney-vento & foster youth support', time: '3min', completed: false },
    { id: '05', title: 'Defensive driving', time: '4min', completed: false },
    { id: '06', title: 'Vehicle inspection', time: '4min', completed: false },
    { id: '07', title: 'Emergency Procedures', time: '3min', completed: false },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header / Breadcrumb */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/my-courses" className="p-2 hover:bg-gray-100 rounded-full transition bg-white shadow-sm">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">My courses</p>
          <h1 className="text-xl font-bold text-slate-800">Yunirides new driver training module 1</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Video & Info */}
        <div className="xl:col-span-8 space-y-6">
          {/* Video Player Mockup */}
          <div className="group relative aspect-video bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200" 
              alt="Course Video" 
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-purple-700">
                <Play className="w-10 h-10 fill-current" />
              </button>
            </div>
            {/* Custom Video Controls Bar Placeholder */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gray-300/30">
              <div className="h-full bg-purple-500 w-[40%]" />
            </div>
          </div>

          {/* Course Content */}
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course 1 welcome to Yunirides</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Welcome to the Yunirides Driver Training Program. This course introduces you to our mission, 
                safety standards, and the escape-ability that comes with transporting children and youth in our communities.
              </p>
              <p>
                At Yunirides, every driver plays a vital role in ensuring that students arrive safely, comfortably, 
                and on time. Our service goes beyond transportation — we provide care, trust, and reliability 
                for families, schools, and the <strong>children we serve</strong>.
              </p>
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

        {/* RIGHT COLUMN: Sidebar List */}
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
          
          {/* Help Card from Figma */}
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