import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import type { WeightEntry } from "../../types/types";
import { weightEntryService } from "../../services/weight.entry.service";
import WeightEntriesTable from "../../components/WeightEntriesTable";
import BMICalculatorModal from "../../components/BMICalculatorModal";
import WeightEntryModal from "../../components/WeightEntryModal";
import { useNotificationApi } from "../../components/Notification";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import type { CreateWeightEntryDTO } from "../../types/dto";

const WeightProgress: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const openNotification = useNotificationApi();

  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);

  const [isBMICalculatorOpen, setIsBMICalculatorOpen] =
    useState<boolean>(false);
  const [isAddWeightEntryOpen, setIsAddWeightEntryOpen] =
    useState<boolean>(false);
  const [action, setAction] = useState<"add" | "edit" | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedWeightEntry, setSelectedWeightEntry] =
    useState<WeightEntry | null>(null);

  const handleDeleteWeightEntryClick = (weightEntry: WeightEntry) => {
    setSelectedWeightEntry(weightEntry);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedWeightEntry(null);
  };

  const handleCloseBMICalculator = () => {
    setIsBMICalculatorOpen(false);
  };

  const handleCloseAddWeightEntry = () => {
    setIsAddWeightEntryOpen(false);
    setAction(null);
    if (selectedWeightEntry) {
      setSelectedWeightEntry(null);
    }
  };

  const handleOpenBMICalculator = () => {
    setIsBMICalculatorOpen(true);
  };

  const handleOpenAddWeightEntry = () => {
    setIsAddWeightEntryOpen(true);
    setAction("add");
  };

  const handleDeleteweightEntry = async () => {
    if (!selectedWeightEntry) return;
    try {
      setLoading(true);
      setLoadingMessage("Deleting weight entry please wait...");
      const response = await weightEntryService.deleteWeightEntry(
        selectedWeightEntry._id
      );
      if (response.success) {
        openNotification.success({
          message: "Success",
          description: "Weight entry deleted successfully",
          type: "success",
        });
        setWeightEntries(
          weightEntries.filter(
            (weightEntry) => weightEntry._id !== selectedWeightEntry._id
          )
        );
        handleCloseDeleteModal();
      } else {
        openNotification.error({
          message: "Error",
          description: response.message,
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("error while deleting weight entry: ", error);
      openNotification.error({
        message: "Error",
        description: "Error while deleting weight entry",
        type: "error",
      });
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

  const handleEditWeightEntryClick = (weightEntry: WeightEntry) => {
    setSelectedWeightEntry(weightEntry);
    setIsAddWeightEntryOpen(true);
    setAction("edit");
  };

  const handleSaveWeightEntry = async (values: any, action: "add" | "edit") => {
    if (!user) return;
    const { weight } = values;
    try {
      setLoading(true);
      setLoadingMessage("Saving weight entry please wait...");

      const payload: CreateWeightEntryDTO = {
        userId: user._id,
        weight,
      };

      if (action === "add") {
        const response = await weightEntryService.createWeightEntry(payload);
        if (response.success) {
          openNotification.success({
            message: "Success",
            description: "Weight entry saved successfully",
            type: "success",
          });
          setWeightEntries([...weightEntries, response.data]);
          handleCloseAddWeightEntry();
        } else {
          openNotification.error({
            message: "Error",
            description: response.message,
            type: "error",
          });
        }
      } else if (action === "edit" && selectedWeightEntry) {
        const response = await weightEntryService.updateWeightEntry(
          selectedWeightEntry?._id,
          {
            weight,
          }
        );

        if (response.success) {
          openNotification.success({
            message: "Success",
            description: "Weight entry updated successfully",
            type: "success",
          });
          setWeightEntries(
            weightEntries.map((weightEntry) =>
              weightEntry._id === selectedWeightEntry._id
                ? { ...weightEntry, weight: weight }
                : weightEntry
            )
          );
          handleCloseAddWeightEntry();
        } else {
          openNotification.error({
            message: "Error",
            description: response.message,
            type: "error",
          });
        }
      }
    } catch (error: any) {
      console.error("error while saving weight entry: ", error);
      openNotification.error({
        message: "Error",
        description: "Error while saving weight entry",
        type: "error",
      });
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

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
      <div className=" w-full flex flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-xl text-[#002A48]">All Weight Entries</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={handleOpenAddWeightEntry}
            className="p-2  bg-[#003366] text-white hover:bg-[#002a48] font-normal rounded-[5px] !cursor-pointer"
          >
            Add Weight Entry
          </button>
          <button
            onClick={handleOpenBMICalculator}
            className="p-2 border border-[#003366] hover:border-[#002a48] text-[#003366] hover:text-[#002a48] font-normal rounded-[5px] !cursor-pointer"
          >
            BMI Calculator
          </button>
        </div>
      </div>
      <WeightEntriesTable
        data={weightEntries}
        handleDeleteWeightEntryClick={handleDeleteWeightEntryClick}
        handleEditWeightEntryClick={handleEditWeightEntryClick}
      />

      <BMICalculatorModal
        handleClose={handleCloseBMICalculator}
        isOpen={isBMICalculatorOpen}
      />

      {action && isAddWeightEntryOpen && (
        <WeightEntryModal
          action={action}
          handleClose={handleCloseAddWeightEntry}
          isOpen={isAddWeightEntryOpen}
          handlesaveWeightEntry={handleSaveWeightEntry}
          defaultValue={selectedWeightEntry?.weight || null}
        />
      )}

      {selectedWeightEntry && showDeleteModal && (
        <DeleteConfirmationModal
          description={"Are you sure you want to delete this weight entry?"}
          handleCancel={handleCloseDeleteModal}
          handleConfirm={handleDeleteweightEntry}
          handleClose={handleCloseDeleteModal}
          isOpen={showDeleteModal}
        />
      )}
    </section>
  );
};

export default WeightProgress;
