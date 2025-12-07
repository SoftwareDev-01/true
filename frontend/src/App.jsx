import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { StatsCards } from "./components/StatsCards";
import { FiltersBar } from "./components/FiltersBar";
import { SortDropdown } from "./components/SortDropdown";
import { SalesTable } from "./components/SalesTable";
import { Pagination } from "./components/Pagination";
import { useSalesData } from "./hooks/useSalesData";

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    customerRegion: [],
    gender: [],
    ageMin: "",
    ageMax: "",
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateFrom: "",
    dateTo: ""
  });
  const [sortBy, setSortBy] = useState("customerName"); // default same as screenshot
  const [page, setPage] = useState(1);

  const { data, loading, error } = useSalesData({
    search,
    filters,
    sortBy,
    page
  });

  const items = data?.items || [];
  const pagination = data?.pagination;

  const updateFilters = (values) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...values }));
  };

  const resetFilters = () => {
    setPage(1);
    setFilters({
      customerRegion: [],
      gender: [],
      ageMin: "",
      ageMax: "",
      productCategory: [],
      tags: [],
      paymentMethod: [],
      dateFrom: "",
      dateTo: ""
    });
    setSearch("");
    setSortBy("customerName");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex flex-1 flex-col px-4 py-3">
        <Topbar
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />

        <StatsCards items={items} />

        {/* Filter row + sort dropdown */}
        <div className="mb-2 flex items-center justify-between gap-3">
          <FiltersBar
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
          />
          <SortDropdown sortBy={sortBy} onChange={setSortBy} />
        </div>

        {/* Table wrapper (single main table, like screenshot) */}
        <div className="flex flex-1 flex-col rounded-md border border-gray-200 bg-white p-2.5">
          {loading ? (
            <div className="flex flex-1 items-center justify-center text-xs text-gray-500">
              Loading...
            </div>
          ) : error ? (
            <div className="flex flex-1 items-center justify-center text-xs text-red-600">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-xs text-gray-500">
              No records match current search / filters.
            </div>
          ) : (
            <SalesTable items={items} />
          )}

          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
