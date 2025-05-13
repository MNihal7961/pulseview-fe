import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import type { Medication } from "../types/types";
import dayjs from "dayjs";
import { useNotificationApi } from "./Notification";

interface MedicationModalProps {
  action: "add" | "edit";
  isOpen: boolean;
  handleClose: () => void;
  handlesaveMedication: (values: any, action: "add" | "edit") => void;
  defaultValue: Medication | null;
}

const MedicationModal: React.FC<MedicationModalProps> = ({
  action,
  handleClose,
  isOpen,
  handlesaveMedication,
  defaultValue,
}) => {
  const openNotification = useNotificationApi();
  const title = action === "add" ? "Add Medication" : "Edit Medication";
  const [form] = Form.useForm();
  const startDate = Form.useWatch("startDate", form);

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        ...defaultValue,
        startDate: dayjs(defaultValue.startDate),
        endDate: dayjs(defaultValue.endDate),
        timings: defaultValue.timings.length ? defaultValue.timings : [{}],
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ timings: [{}] });
    }
  }, [defaultValue, form]);

  const handleSubmit = async (values: any) => {
    await handlesaveMedication(values, action);
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
        name="medication-form"
        layout="vertical"
        className="w-full"
        form={form}
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Input placeholder="e.g., GLP-1" />
          </Form.Item>

          <Form.Item
            name="dosage"
            label="Dosage"
            rules={[{ required: true, message: "Dosage is required" }]}
          >
            <Input placeholder="e.g., 0.5mg" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "End Date is required" }]}
          >
            <DatePicker
              placeholder="Select end date"
              style={{ width: "100%" }}
              disabledDate={(date) => {
                if (!startDate) return date && date.isBefore(dayjs(), "day");
                return date && !date.isAfter(startDate, "day");
              }}
            />
          </Form.Item>
        </div>

        <p className="font-semibold text-[#003366] mb-4 text-center">Timings</p>

        <Form.List
          name="timings"
          rules={[
            {
              validator: async (_, timings) => {
                if (!timings || timings.length < 1) {
                  return Promise.reject(
                    new Error("At least one timing is required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-2"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "time"]}
                    label="Time"
                    rules={[{ required: true, message: "Time is required" }]}
                  >
                    <Select
                      placeholder="Select a Timing"
                      options={[
                        { value: "morning", label: "Morning" },
                        { value: "afternoon", label: "Afternoon" },
                        { value: "evening", label: "Evening" },
                        { value: "night", label: "Night" },
                      ]}
                    />
                  </Form.Item>

                  <div className="flex items-center gap-2">
                    <Form.Item
                      {...restField}
                      name={[name, "intakeCondition"]}
                      label="Intake Condition"
                      rules={[
                        {
                          required: true,
                          message: "Intake Condition is required",
                        },
                      ]}
                      className="w-full m-0"
                    >
                      <Select
                        placeholder="Select an Intake Condition"
                        options={[
                          { value: "before-fasting", label: "Before Fasting" },
                          { value: "after-fasting", label: "After Fasting" },
                          { value: "anytime", label: "Anytime" },
                        ]}
                      />
                    </Form.Item>

                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        className="text-red-500 cursor-pointer text-xl"
                        onClick={() => remove(name)}
                      />
                    )}
                  </div>
                </div>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    const values = form.getFieldValue("timings") || [];
                    const last = values[values.length - 1];

                    if (!last || !last.time || !last.intakeCondition) {
                      openNotification.warning({
                        message: "Warning",
                        description:
                          "Please fill in all the required fields before adding a new timing",
                        type: "warning",
                      });
                      return;
                    }

                    add();
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Timing
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
            {action === "add" ? "Add Medication" : "Update Medication"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default MedicationModal;
