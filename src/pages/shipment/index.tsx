import React, { useEffect } from "react";
import ShipmentCard from "./ShipmentCard";
import { Carousel } from "antd";
import type { Shipment } from "../../types/types";
import ShipmentTable from "../../components/ShipmentTable";
import { shipmentsSampleData } from "../../utils/sample-data";
import { useLoader } from "../../context/LoaderContext";

const Shipment: React.FC = () => {
    const { setLoading, setLoadingMessage } = useLoader();

    useEffect(()=>{
      const init =()=>{
        try{
          setLoading(true);
          setLoadingMessage("Loading shipments please wait...");
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

  const upComingShipments = shipmentsSampleData.filter(
    (item: Shipment) => item.status === "IN_TRANSIT"
  );
  return (
    <section className="mb-4 flex flex-col gap-y-4">
      <h1 className="text-xl text-[#002A48]">Upcoming Shipments</h1>
      <Carousel autoplay arrows dots>
        {upComingShipments.map((item: Shipment, index) => (
          <div key={index}>
            <ShipmentCard key={index} shipment={item} />
          </div>
        ))}
      </Carousel>
      <h1 className="text-xl text-[#002A48]">Shipments</h1>
      <ShipmentTable data={shipmentsSampleData} />
    </section>
  );
};

export default Shipment;
