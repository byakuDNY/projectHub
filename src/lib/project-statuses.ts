import { CheckCircle, CircleOff, Timer } from "lucide-react";

export const statuses = [
  {
    value: "active",
    label: "Active",
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
