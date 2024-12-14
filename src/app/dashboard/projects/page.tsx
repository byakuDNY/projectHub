import db from "@/db";
import { projectsTable } from "@/db/schema";
import columns from "@/features/project/components/columns";
import DataTable from "@/features/project/components/data-table";

// import FormDialog from "@/features/project/components/form-dialog";

const Projects = async () => {
  const projects = await db.select().from(projectsTable).execute();

  return (
    <div className="container mx-auto space-y-5 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Projects({projects.length ?? 0})
        </h1>

        {/* <FormDialog /> */}
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  );
};

export default Projects;
