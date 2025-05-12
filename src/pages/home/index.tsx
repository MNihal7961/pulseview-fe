import React, { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import { Card, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import ShipmentTable from "../../components/ShipmentTable";
import { shipmentsSampleData } from "../../utils/sample-data";
import { medicationService } from "../../services/medication.service";
import type { Medication, WeightEntry } from "../../types/types";
import { weightEntryService } from "../../services/weight.entry.service";
import LineChart from "../../components/LineChart";
import GoalWidget from "../../components/GoalWidget";

const Home: React.FC = () => {
  const { setLoading, setLoadingMessage } = useLoader();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);

  const upComingShipments = shipmentsSampleData.filter(
    (item) => item.status === "IN_TRANSIT"
  );

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setLoadingMessage("Loading Please Wait...");

        const [medications, weightEntries] = await Promise.all([
          medicationService.findAllMedication("1"),
          weightEntryService.findAllWeightEntry("1"),
        ]);

        setMedications(medications?.data || []);
        setWeightEntries(weightEntries?.data || []);
      } catch (error: any) {
        console.error("error while initializing: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setLoadingMessage(null);
        }, 1000);
      }
    };
    init();
  }, []);

  // const renderWeightEntryWidget = () => {
  //   const isNoRecords = weightEntries.length === 0;
  //   const isNoMoreThanOneRecord = weightEntries.length < 2;
  //   const isMoreThanOneRecord = weightEntries.length > 1;

  //   const lastWeightEntry = weightEntries[weightEntries.length - 1];
  //   const previousWeightEntry = weightEntries[weightEntries.length - 2];

  //   const weightDifference =
  //     lastWeightEntry.weight - previousWeightEntry.weight;
  //   const percentageChange =
  //     (Math.abs(weightDifference) / previousWeightEntry.weight) * 100;

  //   const isWeightIncreased = weightDifference > 0;

  //   const textColor = isWeightIncreased ? "#3f8600" : "#cf1322";
  // };

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
              value={weightEntries[weightEntries.length - 1]?.weight || 0}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="Kg"
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
      <div className="flex items-center justify-start w-full  mb-4 rounded-sm bg-gray-50">
        <LineChart weightEntries={weightEntries} />
      </div>
      <div className="flex items-center justify-start w-full  mb-4 rounded-sm bg-gray-50">
        <GoalWidget />
      </div>
      <div className="mb-4 flex flex-col gap-y-4">
        <h1 className="text-xl text-center text-[#002A48]">
          Upcoming Shipments
        </h1>
        <ShipmentTable data={upComingShipments} />
      </div>
    </section>
  );
};

export default Home;
