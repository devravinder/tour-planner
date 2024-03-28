import { ExpenseType, Tour, TourStatus } from "services/tourService";

export type TemplateFormData = Omit<
  Tour,
  "status" | "plannedStartDate" | "plannedEndDate"
> & {
  status?: (typeof statusOptions)[number];
  duration?: Date[];
};

export const statusOptions: { label: string; value: TourStatus }[] = [
  { label: "Pending", value: "Pending" },
  { label: "Completed", value: "Completed" },
  { label: "Up Comming", value: "Up Comming" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "In Progress", value: "In Progress" },
];

export const statusMap = statusOptions.reduce(
  (p, c) => p.set(c.label, c),
  new Map<string, (typeof statusOptions)[number]>(),
);

export const toFormData: (data: Tour) => TemplateFormData = (data) => {
  const { status, plannedStartDate, plannedEndDate, ...rest } = data;
  return {
    ...rest,
    ...(status && { status: statusMap.get(status) }),
    ...(plannedStartDate &&
      plannedEndDate && {
        duration: [new Date(plannedStartDate), new Date(plannedEndDate)],
      }),
  };
};

export const toTour: (data: TemplateFormData) => Tour = (data) => {
  const { status, duration, ...rest } = data;
  return {
    ...rest,
    ...(status && { status: status.value }),
    ...(duration && {
      plannedStartDate: duration[0],
      plannedEndDate: duration[1],
    }),
  };
};

export const expenseOptions: ExpenseType[] = [
  "Travelling",
  "Food",
  "Entry Pass",
  "Donation",
  "Stay",
  "Shopping",
];
