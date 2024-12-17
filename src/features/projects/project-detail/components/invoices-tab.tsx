"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectInvoicesType } from "@/db/schema/invoices-table";

interface InvoicesTabProps {
  invoices: SelectInvoicesType[];
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>A list of project invoices.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              Invoice ID: {invoice.id}, Amount: ${invoice.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
