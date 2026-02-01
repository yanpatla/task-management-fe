import type { Task, TaskStatus } from "../types";

type GroupTask = Record<TaskStatus, Task[]>;

export function groupTasksByStatus(tasks: Task[]): GroupTask {
  const groups: GroupTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
  };

  for (const task of tasks) {
    (groups[task.status] ??= []).push(task);
  }
  return groups;
}

export function formatDate(isoString: string): string {
  const data = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("en-En", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(data); 
}
