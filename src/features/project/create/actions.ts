"use server";

import { revalidatePath } from "next/cache";

import { desc, ne } from "drizzle-orm";

import db from "@/db";
import { clientsTable, projectsTable } from "@/db/schema";

import { ProjectFormSchema } from "./zod-schema";

export const getProjects = async () => {
  try {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.createdAt), desc(projectsTable.updatedAt))
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
      .select({
        id: clientsTable.id,
        name: clientsTable.name,
      })
      .from(clientsTable)
      .where(ne(clientsTable.id, "64962916-8e83-468c-b2d1-806244d7bf6e"))
      .orderBy(desc(clientsTable.createdAt), desc(clientsTable.updatedAt))
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
  const userId = "d915e012-bbad-49be-bb3d-d49670824179";
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
