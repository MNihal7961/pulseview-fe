import React from "react";
import type { Goal } from "../../types/types";
import { Card, Descriptions, type DescriptionsProps } from "antd";
import dayjs from "dayjs";

interface ActiveGoalCardProps {
  goal: Goal;
}
const ActiveGoalCard: React.FC<ActiveGoalCardProps> = ({ goal }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Start Date",
      children: dayjs(goal.startDate).format("DD-MM-YYYY"),
    },
    {
      key: "2",
      label: "End Date",
      children: dayjs(goal.endDate).format("DD-MM-YYYY"),
    },
    {
      key: "3",
      label: "Type",
      children: goal.type,
    },
    {
      key: "3",
      label: "Target Value",
      children: `${goal.targetValue} - ${goal.unit}`,
    },
  ];

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
        className={`text-xs font-semibold p-2 rounded max-w-24 text-center ${colorClass}`}
      >
        {status.toUpperCase()}
      </div>
    );
  };

  return (
    <Card variant="borderless">
      <Descriptions title={StatusChip(goal.status)} items={items} />
    </Card>
  );
};

export default ActiveGoalCard;
