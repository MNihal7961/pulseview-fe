import { Modal } from "antd";
import React from "react";

interface GoalModalProps {
  action: "add" | "edit";
  isOpen: boolean;
  handleClose: () => void;
  handlesaveGoal: (values: any) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({
  action,
  isOpen,
  handleClose,
  handlesaveGoal,
}) => {
  const modalTitle = action === "add" ? "Add Goal" : "Edit Goal";

  const handleSubmit = async (values: any) => {
    await handlesaveGoal(values);
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
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};

export default GoalModal;
