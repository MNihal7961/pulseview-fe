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
  quantity:number;
  status:'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
  createdAt: string;
  updatedAt: string;
  deleveryDate: string;
  userId: string;
}

