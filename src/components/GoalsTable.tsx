import React from "react";
import type { Goal } from "../types/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface GoalsTableProps {
  data: Goal[];
  handleEditClick: (goal: Goal) => void;
  handleDeleteClick: (goal: Goal) => void;
}
const GoalsTable: React.FC<GoalsTableProps> = ({
  data,
  handleDeleteClick,
  handleEditClick,
}) => {
  const StatusChip = (status: string) => {
    let colorClass = "";

    if (status === "completed") {
      colorClass = "text-green-600 bg-green-200 bg-opacity-50";
    } else if (status === "active") {
      colorClass = "text-yellow-600 bg-yellow-200 bg-opacity-50";
    } else if (status === "failed") {
      colorClass = "text-red-600 bg-red-200 bg-opacity-50";
    } else {
      colorClass = "text-blue-600 bg-blue-200 bg-opacity-50"; // default
    }

    return (
      <div
        className={`text-xs font-semibold p-1 rounded max-w-24 text-center ${colorClass}`}
      >
        {status.toUpperCase()}
      </div>
    );
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Target Value
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Goal, index: number) => (
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
                {index + 1}
              </th>
              <td className="px-6 py-4">{item.type.toUpperCase()}</td>
              <td className="px-6 py-4">
                {item.targetValue} - {item.unit}
              </td>
              <td className="px-6 py-4">
                {item.startDate.toString().split("T")[0]}
              </td>
              <td className="px-6 py-4">
                {item.endDate.toString().split("T")[0]}
              </td>
              <td className="px-6 py-4">{StatusChip(item.status)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-x-4 flex-row">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsTable;
