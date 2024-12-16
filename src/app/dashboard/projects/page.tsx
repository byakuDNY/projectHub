import { getProjects } from "@/features/project/create/actions";
import ProjectForm from "@/features/project/create/project-form";
import columns from "@/features/project/dashboard-table/columns";
import DataTable from "@/features/project/dashboard-table/data-table";

const Projects = async () => {
  const projects = await getProjects();

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
