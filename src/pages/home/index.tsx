import React, { useEffect } from "react";
import { useLoader } from "../../context/LoaderContext";
import { Card, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import ShipmentTable from "../../components/ShipmentTable";
import { shipmentsSampleData } from "../../utils/sample-data";

const Home: React.FC = () => {
  const { setLoading, setLoadingMessage } = useLoader();
  const upComingShipments = shipmentsSampleData.filter(
    (item) => item.status === "IN_TRANSIT"
  );

  useEffect(()=>{
    const init =()=>{
      try{
        setLoading(true);
        setLoadingMessage("Loading Please Wait...");
      }catch(error:any){
        console.error("error while initializing: ", error);
      }finally{
        setTimeout(() => {
          setLoading(false);
          setLoadingMessage(null);
        }, 1000)
      }
    }
    init();
  },[])
  return (
    <section>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center min-h-24 rounded-sm bg-gray-50 hover:shadow hover:cursor-pointer">
          <Card variant="borderless" className="w-full">
            <Statistic
              title="Your Next Dose 💊"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </div>
        <div className="flex items-center justify-center min-h-24 rounded-sm bg-gray-50 hover:shadow hover:cursor-pointer">
          <Card variant="borderless" className="w-full">
            <Statistic
              title="Weight Progress 🏋️ 📈"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </div>
        <div className="flex items-center justify-center min-h-24 rounded-sm bg-gray-50 hover:shadow hover:cursor-pointer">
          <Card variant="borderless" className="w-full">
            <Statistic
              title="Upcoming Shipment 🚚"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50">
        <p className="text-2xl text-gray-400">
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 1v16M1 9h16"
            />
          </svg>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">
          <p className="text-2xl text-gray-400">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">
          <p className="text-2xl text-gray-400">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">
          <p className="text-2xl text-gray-400">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">
          <p className="text-2xl text-gray-400">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-y-4">
        <h1 className="text-xl text-center text-[#002A48]">Upcoming Shipments</h1>
        <ShipmentTable data={upComingShipments}/>
      </div>
    </section>
  );
};

export default Home;
