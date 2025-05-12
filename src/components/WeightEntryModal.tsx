import { Form, InputNumber, Modal } from "antd";
import React from "react";

interface WeightEntryModalProps {
  action: "add" | "edit";
  handleClose: () => void;
  isOpen: boolean;
  handlesaveWeightEntry: (values: any, action: "add" | "edit") => void;
  defaultValue: number | null;
}
const WeightEntryModal: React.FC<WeightEntryModalProps> = ({
  action,
  handleClose,
  handlesaveWeightEntry,
  isOpen,
  defaultValue,
}) => {
  const title = action === "add" ? "Add Weight Entry" : "Edit Weight Entry";

  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    await handlesaveWeightEntry(values, action);
  };
  return (
    <Modal
      title={title}
      centered
      open={isOpen}
      onCancel={handleClose}
      maskClosable={false}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        name="bmi-calculator"
        layout="vertical"
        className="w-full"
      >
        <div className="grid grid-cols-1 gap-4">
          <Form.Item
            name="weight"
            label="Weight (kg)"
            rules={[{ required: true, message: "Weight is required" }]}
          >
            <InputNumber
              placeholder="Weight in kg"
              style={{ width: "100%" }}
              defaultValue={defaultValue || undefined}
            />
          </Form.Item>
        </div>

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
            {action === "add" ? "Add Weight Entry" : "Update Weight Entry"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default WeightEntryModal;
