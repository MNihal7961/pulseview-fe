import React from "react";
import { Card, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import type { Shipment } from "../../types/types";

interface ShipmentCardProps {
  shipment: Shipment;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Product Name",
      children: shipment.productName,
    },
    {
      key: "2",
      label: "QTY",
      children: shipment.quantity,
    },
    {
      key: "3",
      label: "Delevery Date",
      children: shipment.deleveryDate.toString().split("T")[0],
    },
  ];

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
        className={`text-xs font-semibold p-2 rounded max-w-24 text-center ${colorClass}`}
      >
        {status}
      </div>
    );
  };

  return (
    <Card variant="borderless">
      <Descriptions title={StatusChip(shipment.status)} items={items} />
    </Card>
  );
};

export default ShipmentCard;
