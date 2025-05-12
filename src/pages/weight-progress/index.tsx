import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import type { WeightEntry } from "../../types/types";
import { weightEntryService } from "../../services/weight.entry.service";
import WeightEntriesTable from "../../components/WeightEntriesTable";

const WeightProgress: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);

  useEffect(() => {
    const init = async (userId: string) => {
      try {
        setLoading(true);
        setLoadingMessage("Loading weight entries please wait...");
        const response = await weightEntryService.findAllWeightEntry(userId);
        if (response.success && response.data.length > 0) {
          setWeightEntries(response.data);
        } else {
          setWeightEntries([]);
        }
      } catch (error: any) {
        console.error("error while initializing: ", error);
      } finally {
        setLoading(false);
        setLoadingMessage(null);
      }
    };
    if (user && user._id) {
      init(user._id);
    }
  }, [user]);

  return (
    <section className="mb-4 flex flex-col gap-y-4">
      {/* <h1 className="text-xl text-[#002A48]">Upcoming Shipments</h1> */}
      {/* <Carousel autoplay arrows dots>
        {upComingShipments.map((item: ShipmentType, index) => (
          <div key={index}>
            <ShipmentCard key={index} shipment={item} />
          </div>
        ))}
      </Carousel> */}
      <h1 className="text-xl text-[#002A48]">All Weight Entries</h1>
      <WeightEntriesTable data={weightEntries} />
    </section>
  );
};

export default WeightProgress;
