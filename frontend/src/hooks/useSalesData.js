import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";

export function useSalesData({ search, filters, sortBy, page }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchSales({ search, filters, sortBy, page })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to fetch data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, filters, sortBy, page]);

  return { data, loading, error };
}
