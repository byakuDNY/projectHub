import { CheckCircle, CircleOff, Timer } from "lucide-react";

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: Timer,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
];
