import { getProjectById } from "@/api/project.api";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function EditPorjectPage() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return "loading...";
  if (isError) return <Navigate to="404" />;
  if (data) return <EditProjectForm data={data} projectId={projectId} />;
}
