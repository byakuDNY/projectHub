import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ClientInformationProps {
  clientName: string
  clientEmail: string
  clientPhone: string
  clientDescription: string
  clientContact: string
  onClientNameChange: (name: string) => void
  onClientEmailChange: (email: string) => void
  onClientPhoneChange: (phone: string) => void
  onClientDescriptionChange: (description: string) => void
  onClientContactChange: (contact: string) => void
}

export function ClientInformation({
  clientName,
  clientEmail,
  clientPhone,
  clientDescription,
  clientContact,
  onClientNameChange,
  onClientEmailChange,
  onClientPhoneChange,
  onClientDescriptionChange,
  onClientContactChange
}: ClientInformationProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Client Information</CardTitle>
          <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <Label htmlFor="clientName">Name</Label>
                <Input id="clientName" value={clientName} onChange={(e) => onClientNameChange(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email</Label>
                <Input id="clientEmail" value={clientEmail} onChange={(e) => onClientEmailChange(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="clientPhone">Phone</Label>
                <Input id="clientPhone" value={clientPhone} onChange={(e) => onClientPhoneChange(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="clientDescription">Description</Label>
                <Textarea id="clientDescription" value={clientDescription} onChange={(e) => onClientDescriptionChange(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="clientContact">Contact Person</Label>
                <Input id="clientContact" value={clientContact} onChange={(e) => onClientContactChange(e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <p><span className="font-medium">Name:</span> {clientName}</p>
              <p><span className="font-medium">Email:</span> {clientEmail}</p>
              <p><span className="font-medium">Phone:</span> {clientPhone}</p>
              <p><span className="font-medium">Description:</span> {clientDescription}</p>
              <p><span className="font-medium">Contact Person:</span> {clientContact}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

