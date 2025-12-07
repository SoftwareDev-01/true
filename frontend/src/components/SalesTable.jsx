import React from "react";

export function SalesTable({ items }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse text-[11px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Transaction ID
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Date
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Customer ID
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Customer name
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Phone Number
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Gender
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Age
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Product Category
            </th>
            <th className="border-b border-gray-200 px-2 py-1 text-left font-medium">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="border-b border-gray-100 px-2 py-1">
                {row.transactionId}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.date
                  ? new Date(row.date).toLocaleDateString("en-GB")
                  : "-"}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.customerId}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.customerName}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.phoneNumber}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.gender}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.age}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.productCategory}
              </td>
              <td className="border-b border-gray-100 px-2 py-1">
                {row.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
