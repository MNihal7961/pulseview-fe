import { Card, Statistic } from "antd";
import React from "react";

interface WidgetCardProps {
  title: string;
  icon: React.ReactNode;
  textColor: string;
  value: number;
  unit: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  icon,
  textColor,
  value,
  unit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-24 rounded-sm bg-gray-50 hover:shadow hover:cursor-pointer">
      <Card variant="borderless" className="w-full">
        <Statistic
          title={title}
          value={value}
          precision={2}
          valueStyle={{ color: `${textColor}` }}
          prefix={icon}
          suffix={unit}
        />
      </Card>
    </div>
  );
};

export default WidgetCard;
