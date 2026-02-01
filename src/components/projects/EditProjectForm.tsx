import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { ProjecFormData, Project } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePorject } from "@/api/project.api";
import { toast } from "react-toastify";
type EditProjectFormProps = {
  data: ProjecFormData;
  projectId: Project["_id"];
};
export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updatePorject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      navigate("/");
    },
  });
  const handleForm = (formData: ProjecFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Create Projects</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill the next form to edit a Project
        </p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Back to Dashboard
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Save Changes"
            className="bg-fuchsia-600 w-full p-3 uppercase font-bold text-white hover:bg-fuchsia-700 transition-colors"
          />
        </form>
      </div>
    </>
  );
}
