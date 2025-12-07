import React from "react";
import { RotateCcw, CalendarDays, SlidersHorizontal } from "lucide-react";
import { FilterDropdown } from "./FilterDropdown";

const REGION_OPTIONS = [
  "North",
  "South",
  "East",
  "West",
  "Central"
];

const GENDER_OPTIONS = [
  "Male",
  "Female",
];

const CATEGORY_OPTIONS = [
  "Clothing",
  "Electronics",
  "Beauty",
];


const TAG_OPTIONS = [
  "smart",
  "portable",
  "wireless",
  "fashion",
  "unisex",
  "skincare",
  "makeup",
  "organic",
  "gadgets",
  "cotton",
  "casual"
];

const PAYMENT_OPTIONS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "Wallet"
];

export function FiltersBar({ filters, onChange, onReset }) {
  const handleArray = (key) => (value) => onChange({ [key]: value });

  return (
    <div className="mb-2 flex items-center justify-between gap-3">
   
      <div className="flex flex-wrap items-center gap-2">
    
        <button
          type="button"
          onClick={onReset}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        <FilterDropdown
          label="Customer Region"
          options={REGION_OPTIONS}
          selected={filters.customerRegion}
          onChange={handleArray("customerRegion")}
        />

        <FilterDropdown
          label="Gender"
          options={GENDER_OPTIONS}
          selected={filters.gender}
          onChange={handleArray("gender")}
        />

      
        <div className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[11px] text-gray-700">
          <span>Age Range</span>
          <div className="ml-2 flex items-center gap-1">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin}
              onChange={(e) => onChange({ ageMin: e.target.value })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[11px]"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax}
              onChange={(e) => onChange({ ageMax: e.target.value })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[11px]"
            />
          </div>
        </div>

        <FilterDropdown
          label="Product Category"
          options={CATEGORY_OPTIONS}
          selected={filters.productCategory}
          onChange={handleArray("productCategory")}
        />

        <FilterDropdown
          label="Tags"
          options={TAG_OPTIONS}
          selected={filters.tags}
          onChange={handleArray("tags")}
        />

        <FilterDropdown
          label="Payment Method"
          options={PAYMENT_OPTIONS}
          selected={filters.paymentMethod}
          onChange={handleArray("paymentMethod")}
        />

        <div className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 py-1 text-[11px] text-gray-700">
          <CalendarDays className="mr-1 h-3.5 w-3.5 text-gray-500" />
          <span>Date</span>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange({ dateFrom: e.target.value })}
            className="ml-2 rounded border border-gray-300 px-1 py-0.5 text-[11px]"
          />
          <span>-</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange({ dateTo: e.target.value })}
            className="rounded border border-gray-300 px-1 py-0.5 text-[11px]"
          />
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
