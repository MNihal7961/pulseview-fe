import React, { useContext, useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import { authContext } from "../../context/AuthContext";
import { medicationService } from "../../services/medication.service";
import type { MedicationWithLogs } from "../../types/types";
import { Carousel } from "antd";
import MedicationTable from "../../components/MedicationTable";
import { medicationLogsService } from "../../services/medication.logs.service";

const Medication: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const [medications, setMedications] = useState<MedicationWithLogs[]>([]);

  useEffect(() => {
    const init = async (userId: string) => {
      try {
        setLoading(true);
        setLoadingMessage("Loading medication please wait...");
        const response = await medicationService.findAllMedication(userId);
        if (response.success && response.data.length > 0) {
          const medicationWithLogs = await Promise.all(
            response.data.map(async (medication: any) => {
              return {
                medication,
                logs: await medicationLogsService.findAllMedicationLogByMedicationId(
                  medication._id
                ),
              };
            })
          );
          setMedications(medicationWithLogs);
        } else {
          setMedications([]);
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

  const getUpcomingMedications = (
    medicationWithLogs: MedicationWithLogs[]
  ): {
    medicationId: string;
    type: string;
    dosage: string;
    time: string;
    intakeCondition: string;
  }[] => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const upcomingDoses = medicationWithLogs.flatMap(({ medication, logs }) => {
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
    });

    return upcomingDoses;
  };

  return (
    <section className="mb-4 flex flex-col gap-y-4">
      <h1 className="text-xl text-[#002A48]">Upcoming Medications</h1>
      <Carousel autoplay arrows dots>
        {getUpcomingMedications(medications).map((item: any, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </Carousel>

      <h1 className="text-xl text-[#002A48]">My Medications</h1>
      <MedicationTable data={medications} />
    </section>
  );
};

export default Medication;
