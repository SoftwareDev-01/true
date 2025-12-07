import React from "react";

export function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages && i <= 7; i++) pages.push(i);

  return (
    <div className="mt-2 flex items-center justify-end gap-1">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-700 disabled:opacity-40"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded-md border px-2 py-1 text-[11px] ${
            p === page
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-300 bg-white text-gray-800"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-700 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
