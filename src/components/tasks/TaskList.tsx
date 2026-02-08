import type { Task, TaskStatus } from "@/types/index";
import { groupTasksByStatus } from "@/utils/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/en";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

const statusStyles: Record<TaskStatus, string> = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};
export default function TaskList({ tasks , canEdit}: TaskListProps) {
  const groupedTasks = groupTasksByStatus(tasks);

  return (
    <>
      {" "}
      <h2 className="text-5xl font-black my-10">Tasks</h2>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, task]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3
              className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status as TaskStatus]}`}
            >
              {statusTranslations[status as TaskStatus]}
            </h3>
            <ul className="mt-5 space-y-5">
              {task.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  There are no Task
                </li>
              ) : (
                task.map((task) => <TaskCard key={task._id} task={task}  canEdit={canEdit}/>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
