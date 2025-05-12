import React from "react";
import type { WeightEntry } from "../types/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface WeightEntriesTableProps {
  data: WeightEntry[];
  handleEditWeightEntryClick: (weightEntry: WeightEntry) => void;
  handleDeleteWeightEntryClick: (weightEntry: WeightEntry) => void;
}
const WeightEntriesTable: React.FC<WeightEntriesTableProps> = ({
  data,
  handleDeleteWeightEntryClick,
  handleEditWeightEntryClick,
}) => {
  return (
    <section>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Weight (kg)
              </th>
              <th scope="col" className="px-6 py-3">
                Added On
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: WeightEntry, index: number) => (
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
                <td className="px-6 py-4">{item.weight}</td>
                <td className="px-6 py-4">
                  {item.createdAt.toString().split("T")[0]}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 flex-row">
                    <button
                      onClick={() => handleEditWeightEntryClick(item)}
                      className="text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      <EditOutlined />
                    </button>
                    <button
                      onClick={() => handleDeleteWeightEntryClick(item)}
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
    </section>
  );
};

export default WeightEntriesTable;
