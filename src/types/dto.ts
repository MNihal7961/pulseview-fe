export interface SignUpUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInUserDTO {
  email: string;
  password: string;
}

export interface CreateGoalDTO {
  userId: string;
  type: "weight" | "height";
  targetValue: number;
  unit: "kg" | "cm";
  startDate: Date;
  endDate: Date;
}

export interface CreateMedicationDTO {
  userId: string;
  type: string;
  dosage: string;
  startDate: Date;
  endDate: Date;
  timings: [
    {
      time: "morning" | "afternoon" | "evening" | "night";
      intakeCondition: "before-fasting" | "after-fasting" | "anytime";
    }
  ];
}

export interface CreateMedicationLogDTO {
  userId: string;
  medicationId: string;
  date: Date;
  time: "morning" | "afternoon" | "evening" | "night";
  status: "taken" | "skipped";
  notes?: string;
}

export interface CreateWeightEntryDTO {
  userId: string;
  weight: number;
}
