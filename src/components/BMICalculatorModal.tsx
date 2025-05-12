import { Form, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";

interface BMICalculatorModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface BMIFormData {
  height: number | null;
  weight: number | null;
  age: number | null;
  gender: "male" | "female" | "other" | null;
}

const BMICalculatorModal: React.FC<BMICalculatorModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [formData, setFormData] = useState<BMIFormData>({
    age: null,
    gender: null,
    height: null,
    weight: null,
  });

  const handleFormValuesChange = (key: keyof BMIFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCalculateBMI = () => {
    const { height, weight } = formData;

    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      setBmiResult(Number(bmi.toFixed(2)));
    }
  };

  const renderBMICalculateForm = () => {
    return (
      <Form name="bmi-calculator" layout="vertical" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Age is required" }]}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="Enter age"
              onChange={(value) => handleFormValuesChange("age", value)}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select
              placeholder="Select Gender"
              onChange={(value) => handleFormValuesChange("gender", value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="height"
            label="Height (cm)"
            rules={[{ required: true, message: "Height is required" }]}
          >
            <InputNumber
              placeholder="Height in cm"
              onChange={(value) => handleFormValuesChange("height", value)}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight (kg)"
            rules={[{ required: true, message: "Weight is required" }]}
          >
            <InputNumber
              placeholder="Weight in kg"
              onChange={(value) => handleFormValuesChange("weight", value)}
              style={{ width: "100%" }}
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
            onClick={handleCalculateBMI}
          >
            Calculate BMI
          </button>
        </div>
      </Form>
    );
  };

  const renderBMIResult = () => {
    return (
      <section>
        <div className="flex flex-col items-center gap-6 w-full py-4">
          <p className="text-lg text-gray-600 font-medium">
            Your BMI is:{" "}
            <span className="font-semibold text-gray-800">
              {bmiResult} kg/m2
            </span>
          </p>
        </div>
        <div className="flex flex-row justify-end items-center gap-4">
          <button
            onClick={() => {
              setFormData({
                age: null,
                gender: null,
                height: null,
                weight: null,
              });
              setBmiResult(null);
            }}
            className="px-4 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            Clear
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-[#002a48] transition"
          >
            Close
          </button>
        </div>
      </section>
    );
  };

  return (
    <Modal
      title="BMI Calculator"
      centered
      open={isOpen}
      onCancel={handleClose}
      maskClosable={false}
      footer={null}
    >
      {!bmiResult && renderBMICalculateForm()}
      {bmiResult && renderBMIResult()}
    </Modal>
  );
};

export default BMICalculatorModal;
