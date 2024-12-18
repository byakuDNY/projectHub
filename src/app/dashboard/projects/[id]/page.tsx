import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getProjectById,
  getProjectClient,
  getProjectKVs,
} from "@/features/projects/project-detail/actions";
import { ClientInformation } from "@/features/projects/project-detail/components/client-information";
import { EnvironmentVariables } from "@/features/projects/project-detail/components/environment-variables";
import { ProjectDetails } from "@/features/projects/project-detail/components/project-details";
import { ProjectHeader } from "@/features/projects/project-detail/components/project-header";

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const projectId = params.id;
  const project = await getProjectById(projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const client = await getProjectClient(projectId);
  // const invoices = await getProjectInvoices(projectId);
  // const payments = await getProjectPayments(projectId);
  const kvs = await getProjectKVs(projectId);

  return (
    <div className="container mx-auto space-y-6 p-6">
      <ProjectHeader
        projectId={projectId}
        projectName={project.name}
        projectDescription={project.description}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProjectDetails
          budget={project.budget}
          startDate={project.startDate}
          endDate={project.endDate}
          status={project.status}
        />

        <ClientInformation
          name={client.name}
          email={client.email}
          phone={client.phone}
          description={client.description}
          contact={client.contact}
          country={client.country}
        />
      </div>

      <EnvironmentVariables projectId={projectId} initialKVs={kvs} />

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
          {/* <InvoicesTab invoices={invoices} /> */}
        </TabsContent>
        <TabsContent value="payments">
          {/* <PaymentsTab payments={payments} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
