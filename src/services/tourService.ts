import api from "./api";
export type TourStatus =
  | "Up Comming"
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export type ExpenseType =
  | "Travelling"
  | "Food"
  | "Stay"
  | "Entry Pass"
  | "Shopping"
  | "Donation";

export type Category =
  | "Tourism"
  | "Business"
  | "Agritourism"
  | "Geotourism"
  | "Experiential"
  | "Culinary"
  | "Fashion"
  | "Package"
  | "Escorted"
  | "Religious"
  | "Cultural"
  | "Adventure"
  | "Self-guided"
  | "Literary"
  | "Cultural"
  | "Sports"
  | "Atomic"
  | "War";

export const categories: Category[] = [
  "Tourism",
  "Business",
  "Agritourism",
  "Geotourism",
  "Experiential",
  "Culinary",
  "Fashion",
  "Package",
  "Escorted",
  "Religious",
  "Cultural",
  "Adventure",
  "Self-guided",
  "Literary",
  "Cultural",
  "Sports",
  "Atomic",
  "War",
];

export type Service =
  | "Audio"
  | "guide"
  | "Food and drinks"
  | "Lunch"
  | "Private tour"
  | "Special activities"
  | "Entrance fees"
  | "Gratuities"
  | "Pick-up and drop off"
  | "Professional guide"
  | "Transport by air-conditioned";
export const services: Service[] = [
  "Audio",
  "guide",
  "Food and drinks",
  "Lunch",
  "Private tour",
  "Special activities",
  "Entrance fees",
  "Gratuities",
  "Pick-up and drop off",
  "Professional guide",
  "Transport by air-conditioned",
];

export type TravellingType = "Alone" | "With Family/Friends";
export const travellingTypes: TravellingType[] = [
  "Alone",
  "With Family/Friends",
];
export type Expense = {
  id: string;
  details: string;
  type: ExpenseType;
  amount?: number;
};

export type Tour = {
  id: string;
  title: string;
  description: string;
  image?: string;
  status?: TourStatus;
  plannedStartDate?: Date;
  plannedEndDate?: Date;
  plannedExpense?: number;
  startDate?: Date;
  endDate?: Date;
  totalExpense?: number;
  travellingType?: TravellingType;
  needLoan?: boolean;
  expenses?: Expense[];
  categories?: Category[];
  services?: Service[];
  // time-stamps
  createdAt?: Date;
  updatedAt?: Date;
  deletedAT?: Date;
};

const endPoint = "/tours";
export const emptyTour: Tour = {
  id: "",
  title: "",
  description: "",
  status: "Up Comming",
  totalExpense: 0,
  expenses: [],
  categories: [],
};
export const emptyExpense: Expense = {
  id: "",
  details: "",
  type: "Travelling",
  amount: 0,
};

export const fake = async () => {
  return emptyTour;
};
export const getTours = async () => {
  //await sleep(10000000);
  const res = await api.get<Tour[]>(endPoint);
  return res.data;
};
export const getTour = async (id: string) => {
  const res = await api.get<Tour>(`${endPoint}/${id}`);
  return res.data;
};
export const createTour = async (tour: Tour) => {
  tour.createdAt = new Date();
  tour.updatedAt = new Date();
  const res = await api.post(endPoint, tour);
  return res.data;
};
export const editTour = async (tour: Tour) => {
  tour.updatedAt = new Date();
  const res = await api.put<Tour>(`${endPoint}/${tour.id}`, tour);
  return res.data;
};

export const deleteTour = async (id: string) => {
  const res = await api.delete(`${endPoint}/${id}`);
  return res;
};
