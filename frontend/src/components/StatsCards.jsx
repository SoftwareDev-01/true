import React, { useMemo } from "react";

export function StatsCards({ items }) {
  const { units, totalAmount, totalDiscount } = useMemo(() => {
    let units = 0;
    let totalAmount = 0;
    let totalDiscount = 0;

    (items || []).forEach((r) => {
      const qty = Number(r.quantity || 0);
      const tAmt = Number(r.totalAmount || 0);
      const fAmt = Number(r.finalAmount || 0);

      units += qty;
      totalAmount += tAmt;
      totalDiscount += tAmt - fAmt;
    });

    return { units, totalAmount, totalDiscount };
  }, [items]);

  return (
    <div className="mb-3 flex gap-3">
      <div className="flex min-w-[160px] flex-col rounded-md border border-gray-200 bg-white px-3 py-2">
        <span className="text-[11px] text-gray-500">Total units sold</span>
        <span className="text-base font-semibold text-gray-900">{units}</span>
        <span className="text-[11px] text-gray-400">10 (per page)</span>
      </div>
      <div className="flex min-w-[200px] flex-col rounded-md border border-gray-200 bg-white px-3 py-2">
        <span className="text-[11px] text-gray-500">Total Amount</span>
        <span className="text-base font-semibold text-gray-900">
          ₹{totalAmount.toLocaleString("en-IN")}
        </span>
        <span className="text-[11px] text-gray-400">(current page)</span>
      </div>
      <div className="flex min-w-[200px] flex-col rounded-md border border-gray-200 bg-white px-3 py-2">
        <span className="text-[11px] text-gray-500">Total Discount</span>
        <span className="text-base font-semibold text-gray-900">
          ₹{totalDiscount.toLocaleString("en-IN")}
        </span>
        <span className="text-[11px] text-gray-400">(current page)</span>
      </div>
    </div>
  );
}
