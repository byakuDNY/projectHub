import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ProjectHeaderProps {
  projectName: string
  projectDescription: string
  projectNotes: string
  onProjectNameChange: (name: string) => void
  onProjectDescriptionChange: (description: string) => void
  onProjectNotesChange: (notes: string) => void
}

export function ProjectHeader({
  projectName,
  projectDescription,
  projectNotes,
  onProjectNameChange,
  onProjectDescriptionChange,
  onProjectNotesChange
}: ProjectHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {isEditing ? (
              <Input
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                className="text-3xl font-bold"
              />
            ) : (
              <h1 className="text-3xl font-bold">{projectName}</h1>
            )}
          </CardTitle>
          <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            <Textarea
              value={projectDescription}
              onChange={(e) => onProjectDescriptionChange(e.target.value)}
              className="mb-4"
            />
            <Textarea
              value={projectNotes}
              onChange={(e) => onProjectNotesChange(e.target.value)}
            />
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-600">{projectDescription}</p>
            <p className="text-gray-600">{projectNotes}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

