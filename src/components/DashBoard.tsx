import {
  BarChartOutlined,
  HomeOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashBoard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const sideBarMenuItems = [
    { name: "Home", icon: <HomeOutlined />, path: "/dashboard/home" },
    {
      name: "Weight Progress",
      icon: <BarChartOutlined />,
      path: "/dashboard/weight-progress",
    },
    {
      name: "Medications",
      icon: <MedicineBoxOutlined />,
      path: "/dashboard/medication",
    },
    {
      name: "Shipments",
      icon: <TruckOutlined />,
      path: "/dashboard/shipment",
    },
    {
      name: "Settings",
      icon: <SettingOutlined />,
      path: "/dashboard/settings",
    },
  ];

  // Auto-close sidebar on route change for small screens
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto">
          {/* Top section */}
          <div>
            <Link
              to={"/"}
              className="flex items-center ps-2.5 mb-5 border-b-2 pb-3 border-gray-300"
            >
              <img
                src="/images/logo.png"
                className="h-8 me-3 sm:h-9"
                alt="Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-950">
                Pulse View
              </span>

              {/* Sidebar Close Button for small screens */}
              <button
                className="ml-auto sm:hidden text-gray-500 hover:text-gray-900"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </Link>

            <ul className="space-y-2 font-medium">
              {sideBarMenuItems.map((item, index) => (
                <li
                  key={index}
                  className={`hover:bg-[#D6DEE7] rounded-lg ${
                    currentPath === item.path ? "bg-[#D6DEE7]" : ""
                  }`}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 !text-gray-600 !font-normal rounded-lg hover:bg-gray-100 ${
                      currentPath === item.path ? "!text-[#002A48] !font-semibold" : ""
                    }`}
                  >
                    {item.icon}
                    <span className="ms-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Logout Button */}
          <div className="p-2 border-t border-gray-300">
            <button className="w-full flex items-center justify-center gap-2 p-2 text-white bg-blue-500 rounded-lg">
              <LogoutOutlined /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 rounded-lg h-[96vh] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
