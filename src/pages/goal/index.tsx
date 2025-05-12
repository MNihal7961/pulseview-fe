import { Carousel } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import type { Goal } from "../../types/types";
import { goalsService } from "../../services/goals.service";
import GoalsTable from "../../components/GoalsTable";

const Goal: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const init = async (userId: string) => {
      try {
        setLoading(true);
        setLoadingMessage("Loading goals please wait...");
        const response = await goalsService.findAllGoals(userId);
        if (response.success && response.data.length > 0) {
          setGoals(response.data);
        } else {
          setGoals([]);
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
      <h1 className="text-xl text-[#002A48]">Active Goals 🎯</h1>
      <Carousel autoplay arrows dots>
        {/* {upComingShipments.map((item: ShipmentType, index) => (
          <div key={index}>
            <ShipmentCard key={index} shipment={item} />
          </div>
        ))} */}
      </Carousel>
      <h1 className="text-xl text-[#002A48]">All Goals</h1>
      <GoalsTable data={goals} />
    </section>
  );
};

export default Goal;
