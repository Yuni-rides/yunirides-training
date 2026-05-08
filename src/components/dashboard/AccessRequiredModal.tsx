"use client";

interface Props {
  tabName: string;
}

export default function AccessRequiredModal({ tabName }: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-8 max-w-sm w-full text-center mx-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Access Required
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          This course is available by request only. To access the{" "}
          <span className="text-[#822C89] font-semibold">{tabName}</span>,
          please submit a request and our team will review your eligibility.
        </p>
        <button
          onClick={() => alert("Request submitted!")}
          className="w-full bg-[#822C89] hover:bg-[#6e2474] text-white font-semibold py-3 rounded-xl transition"
        >
          Request team
        </button>
      </div>
    </div>
  );
}