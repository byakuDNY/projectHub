"use client";

import { useState } from "react";

import { Edit2, Plus, Trash2 } from "lucide-react";

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

import { createProjectKV, deleteProjectKV, updateProjectKV } from "../actions";

interface KV {
  id?: string;
  key: string;
  value: string;
}

interface EnvironmentVariablesProps {
  projectId: string;
  initialKVs: KV[];
}

export function EnvironmentVariables({
  projectId,
  initialKVs,
}: EnvironmentVariablesProps) {
  const [kvs, setKVs] = useState<KV[]>(initialKVs);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [bulkEditText, setBulkEditText] = useState("");

  const addKV = async () => {
    if (newKey && newValue) {
      const result = await createProjectKV(projectId, newKey, newValue);
      setKVs([...kvs, { id: result[0].id, key: newKey, value: newValue }]);
      setNewKey("");
      setNewValue("");
    }
  };

  const updateKV = async (id: string, key: string, value: string) => {
    await updateProjectKV(id, key, value);
    setKVs(kvs.map((kv) => (kv.id === id ? { ...kv, key, value } : kv)));
  };

  const deleteKV = async (id: string) => {
    await deleteProjectKV(id);
    setKVs(kvs.filter((kv) => kv.id !== id));
  };

  const handleBulkEdit = async () => {
    const lines = bulkEditText.split("\n");
    const newKVs = lines
      .map((line) => {
        const [key, value] = line.split("=");
        return { key: key.trim(), value: value.trim() };
      })
      .filter((kv) => kv.key && kv.value);

    // Delete all existing KVs
    for (const kv of kvs) {
      if (kv.id) await deleteProjectKV(kv.id);
    }

    // Insert new KVs
    const updatedKVs = [];
    for (const kv of newKVs) {
      const result = await createProjectKV(projectId, kv.key, kv.value);
      updatedKVs.push({ id: result[0].id, ...kv });
    }

    setKVs(updatedKVs);
    setBulkEditText("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Environment Variables</CardTitle>
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
                  Enter your environment variables in KEY=VALUE format, one per
                  line.
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
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Key</TableHead>
              <TableHead className="w-[50%]">Value</TableHead>
              <TableHead className="w-[10%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kvs.map((kv) => (
              <TableRow key={kv.id}>
                <TableCell>
                  <Input
                    value={kv.key}
                    onChange={(e) =>
                      kv.id && updateKV(kv.id, e.target.value, kv.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={kv.value}
                    onChange={(e) =>
                      kv.id && updateKV(kv.id, kv.key, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => kv.id && deleteKV(kv.id)}>
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
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <Input
            placeholder="New Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button onClick={addKV}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
