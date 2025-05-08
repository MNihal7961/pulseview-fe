import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

type LoaderProps = {
  isLoading: boolean;
  message: string | null;
};

const Loader: React.FC<LoaderProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-screen h-screen pointer-events-none flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      {message && (
        <span className="mt-4 text-primary text-[16px] leading-[19px] font-[600]">
          {message}
        </span>
      )}
    </div>
  );
};

export default Loader;
