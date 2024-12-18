import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectDetailsProps {
  budget: string;
  startDate: string;
  endDate: string;
  status: string;
}

export function ProjectDetails({
  budget,
  startDate,
  endDate,
  status,
}: ProjectDetailsProps) {
  const remainingDays = endDate
    ? Math.ceil(
        (new Date(endDate).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24),
      )
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Budget:</span>
            <span>${budget || "0.00"} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Start Date:</span>
            <span>
              {startDate ? format(new Date(startDate), "PPP") : "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">End Date:</span>
            <span>
              {endDate ? format(new Date(endDate), "PPP") : "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Remaining Days:</span>
            <span>{remainingDays}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{status || "Not set"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
