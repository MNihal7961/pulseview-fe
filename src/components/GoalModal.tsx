import { DatePicker, Form, InputNumber, Modal, Select } from "antd";
import React, { useEffect } from "react";
import type { Goal } from "../types/types";
import dayjs from "dayjs";

interface GoalModalProps {
  action: "add" | "edit";
  isOpen: boolean;
  handleClose: () => void;
  handlesaveGoal: (values: any, action: "add" | "edit") => void;
  defaultValue: Goal | null;
}

const GoalModal: React.FC<GoalModalProps> = ({
  action,
  isOpen,
  handleClose,
  handlesaveGoal,
  defaultValue,
}) => {
  const modalTitle = action === "add" ? "Add Goal" : "Edit Goal";

  const [form] = Form.useForm();
  const startDate = Form.useWatch("startDate", form);

  useEffect(() => {
    if (defaultValue && action === "edit") {
      form.setFieldsValue({
        type: defaultValue.type,
        unit: defaultValue.unit,
        targetValue: defaultValue.targetValue,
        startDate: dayjs(defaultValue.startDate),
        endDate: dayjs(defaultValue.endDate),
        status: defaultValue.status,
      });
    }
  }, [defaultValue, action, form]);

  const handleSubmit = async (values: any) => {
    await handlesaveGoal(values, action);
  };

  return (
    <Modal
      title={modalTitle}
      centered
      open={isOpen}
      onCancel={handleClose}
      maskClosable={false}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        name="GoalForm"
        layout="vertical"
        className="w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Select
              placeholder="Select a goal type"
              options={[
                { value: "height", label: "Height" },
                { value: "weight", label: "Weight" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: "Unit is required" }]}
          >
            <Select
              placeholder="Select a type unit"
              options={[
                { value: "kg", label: "kilograms" },
                { value: "cm", label: "Centimeters" },
              ]}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Form.Item
            name="targetValue"
            label="Target Value"
            rules={[{ required: true, message: "Target Value is required" }]}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="Enter desired target value"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* START DATE */}
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Start Date is required" }]}
          >
            <DatePicker
              placeholder="Select start date"
              style={{ width: "100%" }}
              disabledDate={(date) => date && date.isBefore(dayjs(), "day")}
            />
          </Form.Item>

          {/* END DATE */}
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "End Date is required" }]}
          >
            <DatePicker
              placeholder="Select end date"
              style={{ width: "100%" }}
              disabledDate={(date) => {
                if (!startDate) {
                  return date && date.isBefore(dayjs(), "day");
                }
                return date && !date.isAfter(startDate, "day");
              }}
            />
          </Form.Item>
        </div>

        {action === "edit" && (
          <div className="grid grid-cols-1 gap-4">
            <Form.Item
              name="status"
              label="Goal Status"
              rules={[{ required: true, message: "Goal Status is required" }]}
            >
              <Select
                placeholder="Select a goal status"
                style={{ width: "100%" }}
                options={[
                  { value: "active", label: "Active" },
                  { value: "completed", label: "Completed" },
                  { value: "failed", label: "Failed" },
                ]}
              />
            </Form.Item>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="p-2 border border-[#003366] hover:border-[#002a48] text-[#003366] hover:text-[#002a48] font-normal rounded-[5px] cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 bg-[#003366] text-white hover:bg-[#002a48] font-normal rounded-[5px] cursor-pointer"
          >
            {action === "add" ? "Add Goal" : "Update Goal"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default GoalModal;
