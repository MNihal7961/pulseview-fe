export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface FailedAPIResponse {
  success: boolean;
  message: string;
}

export interface SignUpAPIResponse {
  status: boolean;
  data: User;
  message: string;
}

export interface SignInAPIResponse {
  status: boolean;
  data: User;
  accessToken: string;
  message: string;
}

export interface GetUserAPIResponse {
  status: boolean;
  data: User;
  message: string;
}

export interface ShipmentType {
  _id: string;
  productName: string;
  quantity: number;
  status: "PENDING" | "IN_TRANSIT" | "DELIVERED";
  createdAt: string;
  updatedAt: string;
  deleveryDate: string;
  userId: string;
}

export interface Medication {
  _id: string;
  userId: string;
  type: string; // e.g., GLP-1
  dosage: string; // e.g., 0.5mg
  startDate: Date;
  endDate: Date;
  timings: [
    {
      time: 'morning' | 'afternoon' | 'evening' | 'night', 
      intakeCondition: 'before-fasting' | 'after-fasting' | 'anytime'
    }
  ]
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicationLog {
  _id: string;
  userId: string;
  medicationId: string;
  date: Date; // The day of the medication
  time: 'morning' | 'afternoon' | 'evening' | 'night'; // Which dose time
  status: 'taken' | 'skipped'; // Action by patient
  notes?: string; // Optional reason or comment
  createdAt: Date;
  updatedAt: Date;
}


export interface WeightEntry{
  _id: string;
  userId: string;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal{
  _id: string;
  userId: string;
  type: 'weight' | 'height';
  targetValue: number;
  unit: 'kg' | 'cm';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date
}

export interface MedicationWithLogs {
  medication: Medication;
  logs: MedicationLog[];
}