import { Card, Descriptions, type DescriptionsProps } from "antd";
import React from "react";

interface MedicationCardProps {
  data: {
    medicationId: string;
    type: string;
    dosage: string;
    time: string;
    intakeCondition: string;
  };
}

const MedicationCard: React.FC<MedicationCardProps> = ({ data }) => {
  const { type, dosage, time, intakeCondition } = data;

  const items: DescriptionsProps["items"] = [
    {
      key: "type",
      label: "Type",
      children: type,
    },
    {
      key: "dosage",
      label: "Dosage 💊",
      children: dosage,
    },
    {
      key: "time",
      label: "Time",
      children: time,
    },
    {
      key: "intakeCondition",
      label: "Intake Condition",
      children: intakeCondition,
    },
  ];

  return (
    <Card variant="borderless">
      <Descriptions
        items={items}
        layout="horizontal"
        column={2}
        labelStyle={{ fontWeight: 500 }}
      />
      {/* <div className="flex justify-end mt-4">
        <button className="p-2 bg-[#003366] text-white hover:bg-[#002a48] font-normal rounded-[5px] cursor-pointer">
          Add Medication Log
        </button>
      </div> */}
    </Card>
  );
};

export default MedicationCard;
