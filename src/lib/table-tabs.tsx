export const userTabs = [
  { label: "Active", value: "active", filterField: "vacation_mode", filterValue: false },
  { label: "On Vacation", value: "vacation", filterField: "vacation_mode", filterValue: true },
];

export const itemTabs = [
  { label: "Pending", value: "pending", filterField: "status", filterValue: "PENDING" },
  { label: "Approved", value: "approved", filterField: "status", filterValue: "APPROVED" },
  { label: "Rejected", value: "rejected", filterField: "status", filterValue: "REJECTED" },
  { label: "Under Review", value: "under_review", filterField: "status", filterValue: "UNDER_REVIEW" },
];

export const requestTabs = [
  { label: "Pending", value: "pending", filterField: "status", filterValue: "PENDING" },
  { label: "Accepted", value: "accepted", filterField: "status", filterValue: "ACCEPTED" },
  { label: "Rejected", value: "rejected", filterField: "status", filterValue: "REJECTED" },
  { label: "Expired", value: "expired", filterField: "status", filterValue: "EXPIRED" },
  { label: "Cancelled", value: "cancelled", filterField: "status", filterValue: "CANCELLED" },
];

export const bookingTabs = [
  { label: "Confirmed", value: "confirmed", filterField: "status", filterValue: "CONFIRMED" },
  { label: "In Progress", value: "in_progress", filterField: "status", filterValue: "IN_PROGRESS" },
  { label: "Completed", value: "completed", filterField: "status", filterValue: "COMPLETED" },
  { label: "Cancelled", value: "cancelled", filterField: "status", filterValue: "CANCELLED" },
];