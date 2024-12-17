import { useState } from "react";

import { Edit2, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

interface EnvVariable {
  key: string;
  value: string;
}

interface EnvironmentVariablesProps {
  envVariables: EnvVariable[];
  onEnvVariablesChange: (variables: EnvVariable[]) => void;
}

export function EnvironmentVariables({
  envVariables,
  onEnvVariablesChange,
}: EnvironmentVariablesProps) {
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");
  const [bulkEditText, setBulkEditText] = useState("");

  const addEnvVariable = () => {
    if (newEnvKey && newEnvValue) {
      onEnvVariablesChange([
        ...envVariables,
        { key: newEnvKey, value: newEnvValue },
      ]);
      setNewEnvKey("");
      setNewEnvValue("");
    }
  };

  const deleteEnvVariable = (index: number) => {
    onEnvVariablesChange(envVariables.filter((_, i) => i !== index));
  };

  const updateEnvVariable = (index: number, key: string, value: string) => {
    const updatedVariables = [...envVariables];
    updatedVariables[index] = { key, value };
    onEnvVariablesChange(updatedVariables);
  };

  const saveEnvVariables = () => {
    // Here you would typically save the environment variables to your backend
    console.log("Saving environment variables:", envVariables);
    // You can add an API call here to save the variables
  };

  const handleBulkEdit = () => {
    const lines = bulkEditText.split("\n");
    const newVariables = lines
      .map((line) => {
        const [key, value] = line.split("=");
        return { key: key.trim(), value: value.trim() };
      })
      .filter((variable) => variable.key && variable.value);
    onEnvVariablesChange(newVariables);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Environment Variables</CardTitle>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Bulk Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bulk Edit Environment Variables</DialogTitle>
                  <DialogDescription>
                    Enter your environment variables in KEY=VALUE format, one
                    per line.
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  value={bulkEditText}
                  onChange={(e) => setBulkEditText(e.target.value)}
                  placeholder="API_KEY=your-api-key-here
DATABASE_URL=mongodb://localhost:27017/mydb"
                  className="min-h-[200px]"
                />
                <DialogFooter>
                  <Button onClick={handleBulkEdit}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={saveEnvVariables}>
              <Save className="mr-2 h-4 w-4" />
              Save Variables
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead classNameTableHead className="w-[40%]">
                Key
              </TableHead>
              <TableHead className="w-[50%]">Value</TableHead>
              <TableHead className="w-[10%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {envVariables.map((variable, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={variable.key}
                    onChange={(e) =>
                      updateEnvVariable(index, e.target.value, variable.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={variable.value}
                    onChange={(e) =>
                      updateEnvVariable(index, variable.key, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteEnvVariable(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="New Key"
            value={newEnvKey}
            onChange={(e) => setNewEnvKey(e.target.value)}
          />
          <Input
            placeholder="New Value"
            value={newEnvValue}
            onChange={(e) => setNewEnvValue(e.target.value)}
          />
          <Button onClick={addEnvVariable}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
