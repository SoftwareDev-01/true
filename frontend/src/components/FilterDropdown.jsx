import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [handler]);

  return ref;
}

export function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const toggle = (value) => {
    if (!onChange) return;
    const exists = selected.includes(value);
    const updated = exists
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  const displayLabel =
    selected.length > 0 ? selected.join(", ") : label;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[11px] text-gray-700 hover:bg-gray-50 ${className}`}
      >
        <span>{displayLabel}</span>
        <ChevronDown className="h-3 w-3 text-gray-500" />
      </button>

      {open && (
        <div className="absolute left-0 z-20 mt-1 w-44 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 text-[11px] text-gray-700 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                className="h-3 w-3"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}

          {options.length === 0 && (
            <div className="px-1 py-1 text-[11px] text-gray-400">
              No options
            </div>
          )}
        </div>
      )}
    </div>
  );
}
