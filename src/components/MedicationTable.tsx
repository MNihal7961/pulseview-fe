import React from "react";
import type { MedicationWithLogs } from "../types/types";

interface MedicationTableProps {
  data: MedicationWithLogs[];
}

const MedicationTable: React.FC<MedicationTableProps> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Type & Dosage
            </th>
            <th scope="col" className="px-6 py-3">
              Start & End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Timings
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: MedicationWithLogs, index: number) => (
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
              <td className="px-6 py-4">
                {item.medication.type} - {item.medication.dosage}
              </td>
              <td className="px-6 py-4">
                {item.medication.startDate.toString().split("T")[0]} -{" "}
                {item.medication.endDate.toString().split("T")[0]}
              </td>
              <td className="px-6 py-4">
                {item.medication.timings.map((timing, i) => {
                  let emoji = "";
                  switch (timing.time) {
                    case "morning":
                      emoji = "🌅";
                      break;
                    case "afternoon":
                      emoji = "🌞";
                      break;
                    case "evening":
                      emoji = "🌇";
                      break;
                    case "night":
                      emoji = "🌙";
                      break;
                  }

                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span>{emoji}</span>
                      <span className="capitalize font-semibold">
                        {timing.time}
                      </span>
                      <span className="text-gray-500 italic">
                        ({timing.intakeCondition.replace("-", " ")})
                      </span>
                    </div>
                  );
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2 flex-row">
                  <button className="text-blue-600 hover:text-blue-700">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    Delete
                  </button>
                  <button className="text-green-600 hover:text-green-700">
                    view logs
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

export default MedicationTable;
