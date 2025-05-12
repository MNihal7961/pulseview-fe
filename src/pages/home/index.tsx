import React, { useContext, useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import ShipmentTable from "../../components/ShipmentTable";
import { shipmentsSampleData } from "../../utils/sample-data";
import { medicationService } from "../../services/medication.service";
import type {
  Medication,
  MedicationWithLogs,
  WeightEntry,
} from "../../types/types";
import { weightEntryService } from "../../services/weight.entry.service";
import LineChart from "../../components/LineChart";
import GoalWidget from "../../components/GoalWidget";
import WidgetCard from "../../components/WidgetCard";
import EmptyRecordWidget from "../../components/EmptyRecordWidget";
import { authContext } from "../../context/AuthContext";
import { medicationLogsService } from "../../services/medication.logs.service";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const navigate = useNavigate();

  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationWithLogs[]>(
    []
  );

  const upComingShipments = shipmentsSampleData.filter(
    (item) => item.status === "IN_TRANSIT"
  );

  useEffect(() => {
    const init = async (userId: string) => {
      try {
        setLoading(true);
        setLoadingMessage("Loading Please Wait...");

        const [medications, weightEntries] = await Promise.all([
          medicationService.findAllMedication(userId),
          weightEntryService.findAllWeightEntry(userId),
        ]);

        if (medications?.data && medications?.data.length > 0) {
          const medicationLogs = await Promise.all(
            medications.data.map(async (medication: Medication) => {
              return {
                medication,
                logs: await medicationLogsService.findAllMedicationLogByMedicationId(
                  medication._id
                ),
              };
            })
          );
          setMedicationLogs(medicationLogs);
        }

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
    if (user && user._id) {
      init(user._id);
    }
  }, [user]);

  const renderWeightEntryWidget = () => {
    const isNoRecords = weightEntries.length === 0;
    if (isNoRecords) {
      const handleCTAButtonClick = () => {
        navigate("/dashboard/weight-progress");
      };
      return (
        <EmptyRecordWidget
          title="No Weight Entries Found  👀"
          CTA="Add Weight Entry"
          handleCTAButtonClick={handleCTAButtonClick}
          lastUpdatedValue={null}
          showCTAButton={true}
        />
      );
    }

    const lastUpdatedWeightEntry = weightEntries[weightEntries.length - 1];

    const handleCTAButtonClick = () => {
      navigate("/dashboard/weight-progress");
    };

    if (lastUpdatedWeightEntry) {
      return (
        <WidgetCard
          title="Weight Progress  🏋️ 📈"
          value={lastUpdatedWeightEntry.weight}
          unit="kg"
          lastUpdatedOn={lastUpdatedWeightEntry?.createdAt}
          handleClick={handleCTAButtonClick}
        />
      );
    }
  };

  const renderMedicationWidget = (
    medicationsWithLogs: MedicationWithLogs[]
  ) => {
    const isNoRecords = medicationsWithLogs.length === 0;
    if (isNoRecords) {
      const handleCTAButtonClick = () => {};
      return (
        <EmptyRecordWidget
          title="No Medications Found  👀"
          CTA="Add Medication"
          handleCTAButtonClick={handleCTAButtonClick}
          lastUpdatedValue={null}
          showCTAButton={true}
        />
      );
    }
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const upcomingDoses = medicationsWithLogs.flatMap(
      ({ medication, logs }) => {
        const medStart = new Date(medication.startDate);
        const medEnd = new Date(medication.endDate);

        // Check if today is within medication date range
        if (now < medStart || now > medEnd) return [];

        return medication.timings
          .filter((timing) => {
            const isLogged = logs.some(
              (log) =>
                log.date.toISOString().startsWith(todayStr) &&
                log.time === timing.time
            );
            return !isLogged;
          })
          .map((timing) => ({
            medicationId: medication._id,
            type: medication.type,
            dosage: medication.dosage,
            time: timing.time,
            intakeCondition: timing.intakeCondition,
          }));
      }
    );

    return (
      <div>
        <h3>Upcoming Medications</h3>
        {upcomingDoses.length === 0 ? (
          <p>No upcoming medications for today.</p>
        ) : (
          <ul>
            {upcomingDoses.map((dose, index) => (
              <li key={index}>
                <strong>{dose.type}</strong> - {dose.dosage} at{" "}
                <em>{dose.time}</em> ({dose.intakeCondition})
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <section>
      {/* Sattistics Widgets */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {renderMedicationWidget(medicationLogs)}
        {renderWeightEntryWidget()}
      </div>

      {/* Weight Progress Graph */}
      <div className="flex items-center justify-start w-full  mb-4 rounded-sm bg-gray-50">
        <LineChart weightEntries={weightEntries} />
      </div>

      {/* Goal Widget */}
      <div className="flex items-center justify-start w-full  mb-4 rounded-sm bg-gray-50">
        <GoalWidget />
      </div>

      {/* Upcoming Shipments */}
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
