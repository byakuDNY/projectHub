import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface GitHubLinkProps {
  githubLink: string
  onGithubLinkChange: (link: string) => void
}

export function GitHubLink({ githubLink, onGithubLinkChange }: GitHubLinkProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>GitHub Project</CardTitle>
          <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Input
            value={githubLink}
            onChange={(e) => onGithubLinkChange(e.target.value)}
            placeholder="Enter GitHub project URL"
          />
        ) : (
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {githubLink}
          </a>
        )}
      </CardContent>
    </Card>
  )
}

