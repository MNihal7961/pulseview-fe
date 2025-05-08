import React from "react";
import type { Shipment } from "../types/types";

interface ShipmentTableProps {
  data: Shipment[];
}
const ShipmentTable: React.FC<ShipmentTableProps> = ({ data }) => {
  const StatusChip = (status: string) => {
    let colorClass = "";

    if (status === "DELIVERED") {
      colorClass = "text-green-600 bg-green-200 bg-opacity-50";
    } else if (status === "IN_TRANSIT") {
      colorClass = "text-yellow-600 bg-yellow-200 bg-opacity-50";
    } else if (status === "PENDING") {
      colorClass = "text-red-600 bg-red-200 bg-opacity-50";
    } else {
      colorClass = "text-blue-600 bg-blue-200 bg-opacity-50"; // default
    }

    return (
      <div
        className={`text-xs font-semibold p-1 rounded max-w-24 text-center ${colorClass}`}
      >
        {status}
      </div>
    );
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Delivery Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`bg-white border-b border-gray-200 ${
                index % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.productName}
              </th>
              <td className="px-6 py-4">{item.quantity} - nos</td>
              <td className="px-6 py-4">{StatusChip(item.status)}</td>
              <td className="px-6 py-4">
                {item.deleveryDate.toString().split("T")[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;
