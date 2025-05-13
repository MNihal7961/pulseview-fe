import { Carousel } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import type { Goal } from "../../types/types";
import { goalsService } from "../../services/goals.service";
import GoalsTable from "../../components/GoalsTable";
import { useNotificationApi } from "../../components/Notification";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import GoalModal from "../../components/GoalModal";
import type { CreateGoalDTO } from "../../types/dto";
import ActiveGoalCard from "./ActiveGoalCard";

const GoalPage: React.FC = () => {
  const { user } = useContext(authContext);
  const { setLoading, setLoadingMessage } = useLoader();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [action, setAction] = useState<"add" | "edit" | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const openNotification = useNotificationApi();

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

  const handleAddClick = () => {
    setShowGoalModal(true);
    setAction("add");
  };

  const handleEditClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowGoalModal(true);
    setAction("edit");
  };
  const handleDeleteClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedGoal(null);
  };

  const handleCloseGoalModal = () => {
    setShowGoalModal(false);
    setAction(null);

    if (selectedGoal) {
      setSelectedGoal(null);
    }
  };

  const handleDeleteGoal = async () => {
    if (!selectedGoal) return;
    try {
      setLoading(true);
      setLoadingMessage("Deleting goal please wait...");

      const response = await goalsService.deleteGoal(selectedGoal._id);
      if (response.success) {
        openNotification.success({
          message: "Success",
          description: "Goal deleted successfully",
          type: "success",
        });
        setGoals(goals.filter((goal) => goal._id !== selectedGoal._id));
        handleCloseDeleteModal();
      } else {
        openNotification.error({
          message: "Error",
          description: response.message,
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("error while deleting goal: ", error);
      openNotification.error({
        message: "Error",
        description: error.response.data.message,
        type: "error",
      });
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

  const handlesaveGoal = async (values: any, action: "add" | "edit") => {
    if (!user) return;
    try {
      setLoading(true);
      setLoadingMessage("Saving goal please wait...");

      const payload: CreateGoalDTO = {
        endDate: new Date(values.endDate),
        startDate: new Date(values.startDate),
        targetValue: values.targetValue,
        type: values.type,
        unit: values.unit,
        userId: user?._id,
      };

      if (action === "add") {
        const response = await goalsService.createGoal(payload);
        if (response.success) {
          openNotification.success({
            message: "Success",
            description: "Goal saved successfully",
            type: "success",
          });
          setGoals([...goals, response.data]);
          handleCloseGoalModal();
        } else {
          openNotification.error({
            message: "Error",
            description: response.message,
            type: "error",
          });
        }
      } else if (action === "edit" && selectedGoal) {
        const response = await goalsService.updateGoal(selectedGoal?._id, {
          endDate: values.endDate,
          startDate: values.startDate,
          targetValue: values.targetValue,
          type: values.type,
          unit: values.unit,
          status: values.status,
        });

        if (response.success) {
          openNotification.success({
            message: "Success",
            description: "Goal updated successfully",
            type: "success",
          });
          setGoals(
            goals.map((goal) =>
              goal._id === selectedGoal._id
                ? {
                    ...goal,
                    endDate: new Date(values.endDate),
                    startDate: new Date(values.startDate),
                    targetValue: values.targetValue,
                    type: values.type,
                    unit: values.unit,
                    status: values.status,
                  }
                : goal
            )
          );
          handleCloseGoalModal();
        } else {
          openNotification.error({
            message: "Error",
            description: response.message,
            type: "error",
          });
        }
      }
    } catch (error: any) {
      console.error("error while saving goal: ", error);
      openNotification.error({
        message: "Error",
        description: "Error while saving goal",
        type: "error",
      });
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  };

  return (
    <section className="mb-4 flex flex-col gap-y-4">
      {goals.filter((goal) => goal.status === "active").length > 0 && (
        <>
          <h1 className="text-xl text-[#002A48]">Active Goals 🎯</h1>
          <Carousel autoplay arrows dots>
            {goals
              .filter((goal) => goal.status === "active")
              .map((item: Goal, index) => (
                <div key={index}>
                  <ActiveGoalCard key={index} goal={item} />
                </div>
              ))}
          </Carousel>
        </>
      )}
      <div className=" w-full flex flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-xl text-[#002A48]">My Goals</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={handleAddClick}
            className="p-2  bg-[#003366] text-white hover:bg-[#002a48] font-normal rounded-[5px] !cursor-pointer"
          >
            Add Goal
          </button>
        </div>
      </div>
      <GoalsTable
        data={goals}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      {action && (
        <GoalModal
          action={action}
          handleClose={handleCloseGoalModal}
          isOpen={showGoalModal}
          handlesaveGoal={handlesaveGoal}
          defaultValue={selectedGoal || null}
        />
      )}

      {selectedGoal && showDeleteModal && (
        <DeleteConfirmationModal
          description="Are you sure you want to delete this goal?"
          handleCancel={handleCloseDeleteModal}
          handleConfirm={handleDeleteGoal}
          handleClose={handleCloseDeleteModal}
          isOpen={showDeleteModal}
        />
      )}
    </section>
  );
};

export default GoalPage;
