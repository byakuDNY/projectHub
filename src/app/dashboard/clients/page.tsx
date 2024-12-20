import { getCurrentUser } from "@/features/auth/actions";
import { getClients } from "@/features/clients/actions";
import ClientForm from "@/features/clients/components/form/create-client";
import columns from "@/features/clients/components/table/columns";
import DataTable from "@/features/clients/components/table/data-table";
import { getUserIdByAppwriteId } from "@/features/projects/actions";

const Clients = async () => {
  const currentUser = await getCurrentUser();
  const userId = await getUserIdByAppwriteId(currentUser.accountId);
  const clients = await getClients(userId);

  return (
    <div className="container mx-auto space-y-5 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Clients({clients.length ?? 0})
        </h1>

        <ClientForm userId={userId} />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
};

export default Clients;
