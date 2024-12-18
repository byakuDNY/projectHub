import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Invoice {
  id: string;
  amount: number;
  // Add other invoice fields as needed
}

interface InvoicesTabProps {
  invoices: Invoice[];
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
