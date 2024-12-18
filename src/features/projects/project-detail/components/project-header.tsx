"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { updateProjectDescription, updateProjectName } from "../actions";

interface ProjectHeaderProps {
  projectId: string;
  projectName: string;
  projectDescription: string | null;
}

export function ProjectHeader({
  projectId,
  projectName,
  projectDescription,
}: ProjectHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription || "");

  const handleSave = async () => {
    await updateProjectName(projectId, name);
    await updateProjectDescription(projectId, description);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {isEditing ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-3xl font-bold"
              />
            ) : (
              <h1 className="text-3xl font-bold">{name}</h1>
            )}
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4"
              placeholder="Project description"
            />
            <Button onClick={handleSave} className="mt-4">
              Save
            </Button>
          </>
        ) : (
          <p className="text-gray-600">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
