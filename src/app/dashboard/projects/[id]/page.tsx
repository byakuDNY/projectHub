import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectById } from "@/features/projects/project-detail/actions";
import { ClientInformation } from "@/features/projects/project-detail/components/client-information";
import { EnvironmentVariables } from "@/features/projects/project-detail/components/environment-variables";
import { InvoicesTab } from "@/features/projects/project-detail/components/invoices-tab";
import { PaymentsTab } from "@/features/projects/project-detail/components/payments-tab";
import { ProjectDetails } from "@/features/projects/project-detail/components/project-details";
import { ProjectHeader } from "@/features/projects/project-detail/components/project-header";

const ProjectDetailPage = async ({ params }: { params: { id: string } }) => {
  const projectId = params.id;
  const project = await getProjectById(projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const client = await getClient(project.clientId);
  const invoices = await getProjectInvoices(projectId);
  const payments = await getProjectPayments(projectId);

  return (
    <div className="container mx-auto space-y-6 p-6">
      <ProjectHeader project={project} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProjectDetails project={project} />

        <ClientInformation client={client} />
      </div>

      <EnvironmentVariables projectId={projectId} />

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
          <InvoicesTab invoices={invoices} />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsTab payments={payments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;
