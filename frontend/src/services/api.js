import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://trueb.onrender.com";

const api = axios.create({
  baseURL: `${baseURL}/api`
});

export async function fetchSales({ search, filters, sortBy, page }) {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);
  params.append("page", page || 1);
  params.append("limit", 10);

  const addArray = (key, arr) => {
    if (arr && arr.length) params.append(key, arr.join(","));
  };

  addArray("customerRegion", filters.customerRegion);
  addArray("gender", filters.gender);
  addArray("productCategory", filters.productCategory);
  addArray("tags", filters.tags);
  addArray("paymentMethod", filters.paymentMethod);

  if (filters.ageMin) params.append("ageMin", filters.ageMin);
  if (filters.ageMax) params.append("ageMax", filters.ageMax);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);

  const res = await api.get(`/sales?${params.toString()}`);
  return res.data;
}
