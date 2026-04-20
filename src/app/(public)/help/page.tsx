"use client";

import { MessageSquare, Phone, Mail, ChevronRight, Search } from "lucide-react";
import HelpHeader from "@/components/help/HelpHeader";
import FaqSection from "@/components/help/FaqSection";
import { useLogout } from "@/hooks/useLogout";
import UserMenu from "@/components/UserMenu";


const FAQS = [
  "How do I access my training courses?",
  "Why can't I access some courses?",
  "How do I complete a training module?",
  "Where can I download my certificate?",
  "I forgot my password. What should I do?",
  "Who should I contact if I experience technical issues?",
];

export default function HelpPage() {

  const { handleLogout } = useLogout();
  return (
    <div className="flex-1 flex flex-col min-w-full bg-white">
      {/* Top Bar Section */}
      <HelpHeader />
      

      <div className="px-8 pb-10">
        {/* Intro Text */}
        <div className="mb-8 ml-6">
          <p className="text-gray-500 text-sm">
            Need assistance with your training or account? Our team <br />
            is here to help you complete your courses.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FE]">
            <div className="px-8 pb-10">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <FaqSection />


          {/* RIGHT SECTION: The Sidebar */}

          <div className="w-full lg:w-80 flex flex-col gap-6 items-start"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Live Support & Contact */}
          <div className="w-full lg:w-80 space-y-6">
            {/* SEARCH BAR - FIGMA DESIGN */}
            <div className="w-full">
              <div className="bg-[#EEF0FB] rounded-2xl flex items-center shadow-sm border border-[#e2e4f0] group focus-within:bg-white transition-colors">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 bg-transparent px-5 py-3.5 text-sm font-normal text-gray-700 placeholder:text-gray-400 placeholder:font-medium outline-none"
                />
                <div className="bg-[#1E1B4B] text-white p-3 mx-1 my-1 rounded-lg cursor-pointer">
                  <Search size={18} strokeWidth={2.5} />
                </div>
              </div>
            </div>

          <div className="bg-[#EEF0FB] rounded-2xl p-6 border border-[#e2e4f0] shadow-sm">
  {/* Header with Icon and Divider */}
  <div className="flex items-start gap-3 mb-2">
    <div className="p-1">
      <MessageSquare size={28} className="text-[#1E1B4B]" />
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-[#1E1B4B] leading-none">Live support</h3>
      <div className="h-[1px] bg-gray-300 w-full mt-2"></div>
    </div>
  </div>

  {/* Description Text */}
  <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
    Need immediate help? Our support team is available to assist you with training access, technical issues, and account questions.
  </p>

  {/* Support Hours List */}
  <div className="mb-6">
    <h4 className="text-[13px] font-bold text-black mb-1">Support Hours</h4>
    <ul className="text-[11px] text-gray-600 space-y-1">
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

  {/* Figma Style Purple Button */}
  <button className="w-full bg-[#8B318E] hover:bg-[#822C89] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 transition-all shadow-md">
    Start Live Chat
    <ChevronRight size={18} strokeWidth={2.5} />
  </button>
</div>

            {/* Contact Details Card */}
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