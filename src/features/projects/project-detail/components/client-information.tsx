import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientInformationProps {
  name: string;
  email: string;
  phone: string;
  description: string | null;
  contact: string | null;
  country: string;
}

export function ClientInformation({
  name,
  email,
  phone,
  description,
  contact,
  country,
}: ClientInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            <span className="font-medium">Name:</span> {name || "N/A"}
          </p>
          <p>
            <span className="font-medium">Email:</span> {email || "N/A"}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {phone || "N/A"}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {description || "N/A"}
          </p>
          <p>
            <span className="font-medium">Contact Person:</span>{" "}
            {contact || "N/A"}
          </p>
          <p>
            <span className="font-medium">Country:</span> {country || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
