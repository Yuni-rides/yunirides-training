"use client";

import { useState } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Plus,
  Minus,
} from "lucide-react";
import HelpHeader from "@/components/help/HelpHeader";
import { useLogout } from "@/hooks/useLogout";

const FAQS = [
  {
    question: "How do I access my training courses?",
    answer:
      "Navigate to 'My Courses' from the sidebar. You'll see all available training modules assigned to you. Click on any module to begin learning.",
  },
  {
    question: "Why can't I access some courses?",
    answer:
      "Courses are unlocked sequentially. You must complete and pass the quiz for a course before the next one becomes available.",
  },
  {
    question: "How do I complete a training module?",
    answer:
      "Watch the full video for each course in the module, then pass the quiz that follows. Once all courses in a module are completed, the module is marked as done.",
  },
  {
    question: "Where can I download my certificate?",
    answer:
      "Go to the 'Certificates' page from the sidebar. Once you've completed all courses in a module, your certificate will be available to download there.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer:
      "On the login page, click 'Forgot Password' and enter your registered email. You'll receive a reset link shortly. Check your spam folder if you don't see it.",
  },
  {
    question: "Who should I contact if I experience technical issues?",
    answer:
      "You can reach our support team via the Live Chat option on this page, or contact us directly at info@yunirides.com or 415-535-2155 during business hours.",
  },
];

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
        open ? "border-[#822C89] bg-white" : "border-gray-100 bg-white"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span
          className={`text-sm font-semibold ${open ? "text-[#822C89]" : "text-[#1E1B4B]"}`}
        >
          {question}
        </span>
        <div
          className={`shrink-0 ml-4 p-1 rounded-full transition-colors ${
            open ? "bg-[#822C89] text-white" : "bg-slate-100 text-slate-400"
          }`}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-slate-100 mb-4" />
          <p className="text-xs text-gray-500 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const {} = useLogout();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex-1 flex flex-col min-w-full bg-white h-screen">
      <HelpHeader />

      <div className="px-8 pb-10">
        <div className="mb-8 ml-6">
          <p className="text-gray-500 text-sm">
            Need assistance with your training or account? Our team <br />
            is here to help you complete your courses.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col min-w-0">
            <h2 className="text-base font-black text-[#1E1B4B] uppercase italic mb-4">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  open={activeIndex === i}
                  onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-6">
            

            <div className="bg-[#EEF0FB] rounded-2xl p-6 border border-[#e2e4f0] shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-1">
                  <MessageSquare size={28} className="text-[#1E1B4B]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1E1B4B] leading-none">
                    Live support
                  </h3>
                  <div className="h-[1px] bg-gray-300 w-full mt-2"></div>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                Need immediate help? Our support team is available to assist you
                with training access, technical issues, and account questions.
              </p>

              <div>
                <h4 className="text-[13px] font-bold text-black mb-1">
                  Support Hours
                </h4>
                <ul className="text-[11px] font-bold text-black space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                    Monday to Friday.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                    9AM - 6PM
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#1E1B4B] text-sm px-1">
                Contact Us
              </h3>

              <div className="flex items-center gap-3 bg-[#EEF0FB] p-3 rounded-xl border border-[#e2e4f0]">
                <div className="p-2 bg-[#1E1B4B] rounded-lg text-white">
                  <Phone size={16} />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  415-535-2155
                </span>
              </div>

              <div className="flex items-center gap-3 bg-[#EEF0FB] p-3 rounded-xl border border-[#e2e4f0]">
                <div className="p-2 bg-[#1E1B4B] rounded-lg text-white">
                  <Mail size={16} />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  info@yunirides.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
