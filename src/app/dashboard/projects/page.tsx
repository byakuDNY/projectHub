import columns from "@/features/project/dashboard-table/columns";
import DataTable from "@/features/project/dashboard-table/data-table";

// import FormDialog from "@/features/project/components/form-dialog";

const projects = [
  {
    id: 1,
    name: "Project 1",
    description: "This is a project description",
    status: "active",
    startDate: new Date(),
    endDate: new Date(),
    budget: 1000,
    clientId: 1,
  },
];

const Projects = async () => {
  // const projects = await db.select().from(projectsTable).execute();

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
