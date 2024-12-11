import Link from "next/link";

import { Button } from "@/components/ui/button";
import { columns } from "@/features/client/components/columns";
import { DataTable } from "@/features/client/components/data-table";

export type ClientProps = {
  name: string;
  email: string;
  phone: string;
  amount: number;
};

const clients: ClientProps[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    amount: 125,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    amount: 125,

    phone: "9876543210",
  },
];

const Client = () => {
  return (
    <div className="container mx-auto space-y-5 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Button asChild>
          <Link href="/dashboard/clients/create">Create Client</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
};

export default Client;
