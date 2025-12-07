import React from "react";
import { Search } from "lucide-react";

export function Topbar({ search, onSearchChange }) {
  return (
    <header className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
      <div className="text-[15px] font-semibold text-gray-800">
        Sales Management System
      </div>
      <div className="relative w-72">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Name, Phone no."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-full border border-gray-300 bg-white py-1.5 pl-8 pr-3 text-[13px] text-gray-800 outline-none focus:border-gray-500"
        />
      </div>
    </header>
  );
}
