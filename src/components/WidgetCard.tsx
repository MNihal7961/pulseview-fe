import { PlusOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

interface WidgetCardProps {
  title: string;
  value: number;
  unit: string;
  lastUpdatedOn: Date;
  handleClick: () => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  value,
  unit,
  handleClick,
  lastUpdatedOn,
}) => {
  return (
    <div className="transition-shadow duration-300 ease-in-out hover:shadow-md rounded-xl bg-white h-full">
      <Card
        title={
          <span className="text-base font-semibold text-gray-700">{title}</span>
        }
        variant="borderless"
        className="w-full shadow-none border border-gray-200"
        style={{ height: "100%" }}
      >
        <div className="flex flex-col items-center justify-between gap-4 h-full">
          <div className="text-3xl font-bold text-[#003366]">
            {value}{" "}
            <span className="text-lg font-medium text-gray-500">{unit}</span>
          </div>

          <Tooltip
            title={`Last updated on ${dayjs(lastUpdatedOn).format(
              "MMM D, YYYY h:mm A"
            )}`}
          >
            <span className="text-xs text-gray-400">
              Updated: {dayjs(lastUpdatedOn).fromNow()}
            </span>
          </Tooltip>

          <button
            onClick={handleClick}
            className="flex items-center justify-center w-10 h-10 border-2 border-dashed border-gray-300 rounded-full text-gray-500 hover:border-gray-500 hover:text-gray-700 transition cursor-pointer"
            aria-label="Add"
          >
            <PlusOutlined />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default WidgetCard;
