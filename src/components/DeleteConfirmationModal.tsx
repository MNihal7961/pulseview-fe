import { Modal } from "antd";
import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
  description: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  description,
  handleCancel,
  handleConfirm,
  handleClose,
  isOpen,
}) => {
  return (
    <Modal
      maskClosable={false}
      footer={null}
      title={"Are you sure you ?"}
      open={isOpen}
      onCancel={handleClose}
      centered
    >
      <div className="flex flex-col gap-4 w-full">
        <p className="text-gray-500">{description}</p>
        <div className="flex flex-row justify-end gap-4">
          <button
            onClick={handleCancel}
            className="p-2 border border-[#003366] hover:border-[#002a48] text-[#003366] hover:text-[#002a48] font-normal rounded-[5px] !cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="p-2  bg-[#003366] text-white hover:bg-[#002a48] font-normal rounded-[5px] !cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
