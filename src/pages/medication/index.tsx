import React, { useContext, useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import { authContext } from "../../context/AuthContext";
import { medicationService } from "../../services/medication.service";
import type { Medication, MedicationWithLogs } from "../../types/types";
import { Carousel } from "antd";
import MedicationTable from "../../components/MedicationTable";
import { medicationLogsService } from "../../services/medication.logs.service";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import type { CreateMedicationDTO } from "../../types/dto";
import { useNotificationApi } from "../../components/Notification";
import MedicationModal from "../../components/MedicationModal";
import MedicationCard from "./MedicationCard";

const Medication: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const openNotification = useNotificationApi();

  const [medications, setMedications] = useState<MedicationWithLogs[]>([]);

  const [showMedicationModal, setShowMedicationModal] =
    useState<boolean>(false);
  const [action, setAction] = useState<"add" | "edit" | null>(null);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const init = async (userId: string) => {
      try {
        setLoading(true);
        setLoadingMessage("Loading medication please wait...");
        const response = await medicationService.findAllMedicationByUserId(
          userId
        );
        if (response.success && response.data) {
          const medicationWithLogs = await Promise.all(
            response.data.map(async (medication: Medication) => {
              const result =
                await medicationLogsService.findAllMedicationLogByMedicationId(
                  medication._id
                );
              return {
                medication,
                logs: result?.data || [],
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
    console.log("🚀 ~ medicationWithLogs:", medicationWithLogs);
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

  const handleDeleteClick = (medication: Medication) => {
    setSelectedMedication(medication);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setSelectedMedication(null);
    setShowDeleteModal(false);
  };

  const handleAddClick = () => {
    setAction("add");
    setShowMedicationModal(true);
  };

  const handleEditClick = (medication: Medication) => {
    setSelectedMedication(medication);
    setAction("edit");
    setShowMedicationModal(true);
  };

  const handleMedicationCancel = () => {
    setAction(null);
    setShowMedicationModal(false);
    if (selectedMedication) {
      setSelectedMedication(null);
    }
  };

  const handleDeleteMedication = async () => {
    if (!selectedMedication) return;
    try {
      setLoading(true);
      setLoadingMessage("Deleting medication please wait...");
    } catch (error: any) {
      console.error("error while deleting medication: ", error);
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

  const handleSaveMedication = async (values: any, action: "add" | "edit") => {
    console.log("🚀 ~ handleSaveMedication ~ values:", values);
    if (!user) return;
    try {
      setLoading(true);
      setLoadingMessage("Saving medication please wait...");

      if (action === "add") {
        const payload: CreateMedicationDTO = {
          dosage: values.dosage,
          endDate: new Date(values.endDate),
          startDate: new Date(values.startDate),
          timings: values.timings,
          type: values.type,
          userId: user._id,
        };
        const response = await medicationService.createMedication(payload);
        if (response.success) {
          openNotification.success({
            message: "Success",
            description: "Medication saved successfully",
            type: "success",
          });
          setMedications([
            ...medications,
            { logs: [], medication: response.data },
          ]);
          handleMedicationCancel();
        } else {
          openNotification.error({
            message: "Error",
            description: response.message,
            type: "error",
          });
        }
      } else if (action === "edit" && selectedMedication) {
        const response = await medicationService.updateMedication(
          selectedMedication._id,
          values
        );
        if (response.success) {
          openNotification.success({
            message: "Success",
            description: "Medication updated successfully",
            type: "success",
          });
          const updatedMedications = medications.map((medication) => {
            if (medication.medication._id === selectedMedication._id) {
              return {
                ...medication,
                medication: {
                  ...medication.medication,
                  ...values,
                },
              };
            }
            return medication;
          });
          setMedications(updatedMedications);
          handleMedicationCancel();
        } else {
          openNotification.error({
            message: "Error",
            description: response.message,
            type: "error",
          });
        }
      }
    } catch (error: any) {
      console.error("error while saving medication: ", error);
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };
  return (
    <section className="mb-4 flex flex-col gap-y-4">
      <h1 className="text-xl text-[#002A48]">Upcoming Medications</h1>
      <Carousel autoplay arrows dots>
        {getUpcomingMedications(medications).map((item: any, index) => (
          <MedicationCard key={index} data={item} />
        ))}
      </Carousel>
      <div className=" w-full flex flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-xl text-[#002A48]">My Medications</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={handleAddClick}
            className="p-2  bg-[#003366] text-white hover:bg-[#002a48] font-normal rounded-[5px] !cursor-pointer"
          >
            Add Medication
          </button>
        </div>
      </div>
      <MedicationTable
        data={medications}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      {action && showMedicationModal && (
        <MedicationModal
          action={action}
          handleClose={handleMedicationCancel}
          isOpen={showMedicationModal}
          handlesaveMedication={handleSaveMedication}
          defaultValue={selectedMedication}
        />
      )}

      {showDeleteModal && selectedMedication && (
        <DeleteConfirmationModal
          description="Are you sure you want to delete this medication?"
          isOpen={showDeleteModal}
          handleCancel={handleDeleteCancel}
          handleClose={handleDeleteCancel}
          handleConfirm={handleDeleteMedication}
        />
      )}
    </section>
  );
};

export default Medication;
