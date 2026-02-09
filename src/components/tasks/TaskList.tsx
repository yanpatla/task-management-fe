import type { Project, Task, TaskProject, TaskStatus } from "@/types/index";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { groupTasksByStatus } from "@/utils/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/en";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { updateStatusTask } from "@/api/task.api";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

const statusStyles: Record<TaskStatus, string> = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};
export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams();
  const projectId = params.projectId!;

  const groupedTasks = groupTasksByStatus(tasks);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateStatusTask,

    // ✅ OPTIMISTIC UPDATE
    onMutate: async (vars: {
      projectId: string;
      taskId: string;
      status: TaskStatus;
    }) => {
      // Cancela refetchs en vuelo para que no “pisen” tu optimistic update. :contentReference[oaicite:1]{index=1}
      await queryClient.cancelQueries({
        queryKey: ["project", vars.projectId],
      });

      // Snapshot para rollback si falla. :contentReference[oaicite:2]{index=2}
      const previousProject = queryClient.getQueryData([
        "project",
        vars.projectId,
      ]);

      // Actualización optimista del cache
      queryClient.setQueryData(["project", vars.projectId], (old: Project) => {
        if (!old) return old;

        return {
          ...old,
          // 👇 OJO: es `tasks`, no `task` (ese era un bug en tu código)
          tasks: old.tasks.map((t) =>
            t._id === vars.taskId ? { ...t, status: vars.status } : t,
          ),
        };
      });

      // Si también tenés una query individual por task, podés mantenerla consistente:
      queryClient.setQueryData<Task>(["task", vars.taskId], (old) => {
        if (!old) return old;
        return { ...old, status: vars.status };
      });

      return { previousProject };
    },

    onError: (error, vars, context) => {
      // Rollback al snapshot si el backend falla. :contentReference[oaicite:3]{index=3}
      if (context?.previousProject) {
        queryClient.setQueryData(
          ["project", vars.projectId],
          context.previousProject,
        );
      }
      toast.error(error?.message ?? "Error al actualizar el status");
    },

    onSuccess: (msg) => {
      // Toast/side-effects SOLO si salió bien
      if (msg) toast.success(msg);
    },

    onSettled: (_data, _error, vars) => {
      // Resync SIEMPRE al final (éxito o error) para quedar igual que el server. :contentReference[oaicite:4]{index=4}
      queryClient.invalidateQueries({ queryKey: ["project", vars.projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", vars.taskId] });
    },
  });
  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    if (over && active) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutation.mutate({ projectId, taskId, status });
    }
  };
  return (
    <>
      {" "}
      <h2 className="text-5xl font-black my-10">Tasks</h2>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, task]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status as TaskStatus]}`}
              >
                {statusTranslations[status as TaskStatus]}
              </h3>
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {task.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    There are no Task
                  </li>
                ) : (
                  task.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
