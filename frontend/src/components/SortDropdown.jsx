import React from "react";

export function SortDropdown({ sortBy, onChange }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-gray-600">
      <span>Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-800"
      >
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>
    </div>
  );
}
