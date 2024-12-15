"use server";

import { revalidatePath } from "next/cache";

import { desc } from "drizzle-orm";

import db from "@/db";
import { clientsTable, projectsTable } from "@/db/schema";

import { ProjectFormSchema } from "./zod-schema";

export const getProjects = async () => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.created_at), desc(projectsTable.updated_at))
      .execute();
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};

export const getUsersIdAndName = async () => {
  try {
    const users = await db
      .select({ id: clientsTable.id, name: clientsTable.name })
      .from(clientsTable)
      .execute();
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const insertProject = async ({
  name,
  description,
  content,
  clientId,
  budget,
  status,
  startDate,
  endDate,
}: ProjectFormSchema) => {
  const userId = "323";
  try {
    await db
      .insert(projectsTable)
      .values({
        name: name,
        description: description,
        content: content,
        userId: userId,
        clientId: clientId,
        budget: budget,
        status: status,
        startDate: startDate,
        endDate: endDate,
        createdAt: new Date(),
      })
      .execute();

    revalidatePath("/dashboard/projects");
  } catch (error) {
    console.error("Error add project:", error);
    throw error;
  }
};
