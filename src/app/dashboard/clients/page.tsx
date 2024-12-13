import db from "@/db";
import { clientsTable } from "@/db/schema";
import { columns } from "@/features/client/components/columns";
import { DataTable } from "@/features/client/components/data-table";
import FormDialog from "@/features/client/components/form-dialog";

const Clients = async () => {
  const clients = await db.select().from(clientsTable).execute();

  return (
    <div className="container mx-auto space-y-5 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Clients({clients.length ?? 0})
        </h1>

        <FormDialog />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
};

export default Clients;
