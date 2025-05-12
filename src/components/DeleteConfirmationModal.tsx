import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
  description: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = () => {
  return <div>DeleteConfirmationModal</div>;
};

export default DeleteConfirmationModal;
