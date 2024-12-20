import { getCurrentUser } from "@/features/auth/actions";
import { getProjects } from "@/features/projects/actions";
import ProjectForm from "@/features/projects/components/form/create-project";
import columns from "@/features/projects/components/table/columns";
import DataTable from "@/features/projects/components/table/data-table";

const Projects = async () => {
  const currentUser = await getCurrentUser();
  const projects = await getProjects(currentUser.accountId);

  return (
    <div className="container mx-auto space-y-5 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Projects({projects.length ?? 0})
        </h1>
        <ProjectForm />
      </div>
      {/* <ProjectsSummary/> */}
      <DataTable columns={columns} data={projects} />
    </div>
  );
};

export default Projects;
