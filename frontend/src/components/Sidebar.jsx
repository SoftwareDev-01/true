import React from "react";
import {
  LayoutDashboard,
  FileText,
  Clock3,
  CheckCircle2,
  Archive,
  Inbox,
  ChevronDown
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex w-60 flex-col bg-gray-100 px-4 py-3 text-gray-900">

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-800">
          V
        </div>
        <div>
          <div className="text-[13px] font-semibold text-gray-700">Vault</div>
          <div className="text-[11px] text-gray-500">Anuraj Yadav</div>
        </div>
      </div>

      <div className="mb-2 text-[11px] font-semibold uppercase text-gray-500">
        Dashboard
      </div>
      <nav className="mb-4 space-y-1">
        <button className="flex w-full items-center gap-2 rounded-md bg-gray-200 px-2.5 py-1.5 text-left text-[13px] text-gray-800">
          <LayoutDashboard className="h-4 w-4" />
          <span>Sales</span>
        </button>
      </nav>

      <div className="mb-2 text-[11px] font-semibold uppercase text-gray-500">
        Intake
      </div>
      <nav className="space-y-1 text-[13px] text-gray-700">
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-200">
          <Clock3 className="h-4 w-4" />
          <span>Pre-active</span>
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-200">
          <Inbox className="h-4 w-4" />
          <span>Active</span>
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-200">
          <CheckCircle2 className="h-4 w-4" />
          <span>Closed</span>
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-200">
          <Archive className="h-4 w-4" />
          <span>Blocked</span>
        </button>
      </nav>

      <div className="mt-5 mb-2 text-[11px] font-semibold uppercase text-gray-500">
        Invoices
      </div>
      <nav className="space-y-1 text-[13px] text-gray-700">
        <button className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-200">
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Proforma Invoices</span>
          </span>
          <ChevronDown className="h-3 w-3 text-gray-500" />
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-200">
          <FileText className="h-4 w-4" />
          <span>Final Invoices</span>
        </button>
      </nav>
    </aside>
  );
}
