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
    <div className="flex items-center justify-center min-h-24 rounded-sm bg-white hover:shadow hover:cursor-pointer">
      <Card variant="borderless" className="w-full" title={title}>
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
