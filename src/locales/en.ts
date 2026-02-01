import type { TaskStatus } from "../types";

export const statusTranslations: Record<TaskStatus, string> = {
  pending: "Pending",
  onHold: "On Hold",
  inProgress: "In Progress",
  underReview: "Under Review",
  completed: "Completed",
};
