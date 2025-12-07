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
    <aside className="flex w-60 flex-col bg-sidebar px-4 py-3 text-gray-100">
      {/* Top user section */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold">
          V
        </div>
        <div>
          <div className="text-[13px] font-semibold">Vault</div>
          <div className="text-[11px] text-sidebar-muted">Anuraj Yadav</div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="mb-2 text-[11px] font-semibold uppercase text-sidebar-muted">
        Dashboard
      </div>
      <nav className="mb-4 space-y-1">
        <button className="flex w-full items-center gap-2 rounded-md bg-gray-900 px-2.5 py-1.5 text-left text-[13px]">
          <LayoutDashboard className="h-4 w-4" />
          <span>Sales</span>
        </button>
      </nav>

      {/* Status / Intake */}
      <div className="mb-2 text-[11px] font-semibold uppercase text-sidebar-muted">
        Intake
      </div>
      <nav className="space-y-1 text-[13px] text-gray-300">
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-800">
          <Clock3 className="h-4 w-4" />
          <span>Pre-active</span>
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-800">
          <Inbox className="h-4 w-4" />
          <span>Active</span>
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-800">
          <CheckCircle2 className="h-4 w-4" />
          <span>Closed</span>
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-800">
          <Archive className="h-4 w-4" />
          <span>Blocked</span>
        </button>
      </nav>

      <div className="mt-5 mb-2 text-[11px] font-semibold uppercase text-sidebar-muted">
        Invoices
      </div>
      <nav className="space-y-1 text-[13px] text-gray-300">
        <button className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-800">
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Proforma Invoices</span>
          </span>
          <ChevronDown className="h-3 w-3 text-sidebar-muted" />
        </button>
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left hover:bg-gray-800">
          <FileText className="h-4 w-4" />
          <span>Final Invoices</span>
        </button>
      </nav>
    </aside>
  );
}
