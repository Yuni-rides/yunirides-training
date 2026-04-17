"use client";

import { Plus } from "lucide-react";

const FAQS = [
  "How do I access my training courses?",
  "Why can't I access some courses?",
  "How do I complete a training module?",
  "Where can I download my certificate?",
  "I forgot my password. What should I do?",
  "Who should I contact if I experience technical issues?",
];

export default function FaqSection() {
  return (
    <div className="flex-1 ">
      {/* FAQ Title */}
      <h2 className="text-[#4F3E9C] font-bold mb-4">
        Frequently Asked Questions (FAQ)
      </h2>

      {/* FAQ List */}
      <div className="space-y-5">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl w-[700px] h-[50px] p-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow group"
          >
            <span className="text-sm text-gray-700 font-medium group-hover:text-[#4F3E9C] transition-colors">
              {faq}
            </span>
            <Plus size={18} className="text-[#4F3E9C]" />
          </div>
        ))}
      </div>
    </div>
  );
}