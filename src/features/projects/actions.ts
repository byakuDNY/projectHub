"use server";

import { revalidatePath } from "next/cache";

import { desc, eq, ne } from "drizzle-orm";

import db from "@/db";
import { clientsTable, projectsTable, usersTable } from "@/db/schema";
import projectFormSchema, {
  ProjectFormSchema,
} from "@/features/projects/zod-schema";

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

export const createProject = async ({
  name,
  description,
  content,
  appwriteId,
  clientId,
  budget,
  status,
  startDate,
  endDate,
}: ProjectFormSchema) => {
  try {
    const validatedProject = projectFormSchema.parse({
      name: name,
      description: description,
      content: content,
      appwriteId: appwriteId,
      clientId: clientId,
      budget: budget,
      status: status,
      startDate: startDate,
      endDate: endDate,
    });

    const userId = await getUserIdByAppwriteId(validatedProject.appwriteId);

    await db
      .insert(projectsTable)
      .values({
        name: validatedProject.name,
        description: validatedProject.description,
        content: validatedProject.content,
        userId: userId,
        clientId: validatedProject.clientId,
        budget: validatedProject.budget,
        status: validatedProject.status,
        startDate: validatedProject.startDate,
        endDate: validatedProject.endDate,
      })
      .execute();

    revalidatePath("/dashboard/projects");
  } catch (error) {
    console.error("Error add project:", error);
    throw error;
  }
};

const getUserIdByAppwriteId = async (appwriteId: string) => {
  try {
    const user = await db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.appwriteId, appwriteId))
      .execute();

    return user[0]?.id;
  } catch (error) {
    console.error("Error get user id by appwrite id:", error);
    throw error;
  }
};
