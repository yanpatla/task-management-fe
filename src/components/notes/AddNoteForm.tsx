import { createNote } from "@/api/note.api";
import type { NoteFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";

export default function AddNoteForm() {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;
  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      reset();
    },
  });
  const handleAddNote = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData });
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Create Note
        </label>
        <input
          type="text"
          id="content"
          placeholder="Note Content"
          className="w-full p-3 border-gray-300 border"
          {...register("content", {
            required: "The content is required",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Create Note"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w0full p-2 text-white font-black cursor-pointer transition-colors"
      />
    </form>
  );
}
