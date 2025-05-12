import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

interface EmptyRecordWidgetProps {
  title: string;
  CTA: string;
  handleCTAButtonClick: () => void;
  showCTAButton: boolean;
  lastUpdatedValue: string | null;
}

const EmptyRecordWidget: React.FC<EmptyRecordWidgetProps> = ({
  title,
  CTA,
  handleCTAButtonClick,
  showCTAButton,
  lastUpdatedValue,
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
        {showCTAButton && (
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-gray-500">{CTA}</p>
            <button
              onClick={handleCTAButtonClick}
              className="cursor-pointer flex items-center justify-center w-10 h-10 border-2 border-dashed border-gray-400 rounded-full text-gray-500 hover:border-gray-500 hover:text-gray-700 transition"
            >
              <PlusOutlined />
            </button>
          </div>
        )}
        {!showCTAButton && (
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-gray-500">Last Updated: {lastUpdatedValue}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmptyRecordWidget;
