import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="opacity-80">
            <path d="M3 12s5-6 11-6 7 6 7 6-5 6-11 6S3 12 3 12z" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#ecfdf5"/>
            <path d="M12 8s1 2 4 2" stroke="#0f766e" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <div>
            <div className="font-semibold text-gray-800">ShareEase</div>
            <div className="text-xs text-gray-500">Prototype for community sharing</div>
          </div>
        </div>

        <div className="mt-3 md:mt-0">
          © {new Date().getFullYear()} ShareEase — data stored in-memory for demo.
        </div>
      </div>
    </footer>
  );
}
