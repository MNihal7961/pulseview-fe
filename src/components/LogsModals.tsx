import React from "react";
import type { MedicationLog } from "../types/types";
import { Modal } from "antd";

interface LogsModalsProps {
  logs: MedicationLog[];
  open: boolean;
  onClose: () => void;
}
const LogsModals: React.FC<LogsModalsProps> = ({ logs, onClose, open }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Medication Logs"
      maskClosable={false}
    >
      {logs.map((log) => (
        <div key={log._id}>
          <p className="text-gray-500">{log.notes}</p>
          <p className="text-gray-500">{log.status}</p>
        </div>
      ))}
    </Modal>
  );
};

export default LogsModals;
