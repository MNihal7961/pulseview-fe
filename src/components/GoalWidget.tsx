import React, { useContext, useEffect, useState } from "react";
import type { Goal } from "../types/types";
import { goalsService } from "../services/goals.service";
import { authContext } from "../context/AuthContext";
import { Carousel } from "antd";
import ActiveGoal from "./ActiveGoal";
import { useNavigate } from "react-router-dom";

const GoalWidget: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const init = async (userId: string) => {
      const response = await goalsService.findAllGoals(userId);
      if (response.success) {
        setGoals(response.data);
      }
    };
    if (user && user._id) {
      init(user._id);
    }
  }, [user]);

  const renderAddGoalCTA = () => {
    const handleAddGoal = () => {
      navigate("/dashboard/goal");
    };
    return (
      <section className="bg-gray-50">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className="w-full"
            src="/images/no-goals.svg"
            alt="No goals illustration"
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              You haven’t added any goals yet
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">
              Start by creating your first goal to stay focused and motivated.
              Set clear objectives, track your progress, and celebrate your
              achievements.
            </p>
            <button
              onClick={handleAddGoal}
              type="button"
              className="inline-flex items-center text-white bg-[#003366] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              Create Your First Goal
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderCurrentActiveGoals = () => {
    return (
      <Carousel autoplay arrows dots>
        {goals.map((item: Goal, index) => (
          <div key={index}>
            <ActiveGoal key={index} goal={item} />
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <section className="w-full">
      {goals.length <= 0 && renderAddGoalCTA()}
      {goals.length > 0 && renderCurrentActiveGoals()}
    </section>
  );
};

export default GoalWidget;
