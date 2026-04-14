export default function Header() {
  return (
    <div className="w-full bg-[#EFF2FF] rounded-xl px-6 py-4 flex items-center justify-between">
      
      {/* Left */}
      <h1 className="text-lg font-semibold text-gray-700">
        My Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-3">
        
        {/* Profile */}
        <div className="flex items-center gap-2 bg-[#EFF2FF] px-3 py-1 rounded-lg shadow-sm">
          <img
           src="/images/profileman.jpg"
            className="w-8 h-8 rounded-full"
          />
         
        </div>
      </div>
    </div>
  );
}