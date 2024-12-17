"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectPaymentsType } from "@/db/schema/payments-table";

interface PaymentsTabProps {
  payments: SelectPaymentsType[];
}

export function PaymentsTab({ payments }: PaymentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>A list of project payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {payments.map((payment) => (
            <li key={payment.id}>
              Payment ID: {payment.id}, Amount: ${payment.amount.toFixed(2)},
              Status: {payment.status}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
