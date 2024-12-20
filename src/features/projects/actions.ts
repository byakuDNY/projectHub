"use server";

import { revalidatePath } from "next/cache";

import { desc, eq } from "drizzle-orm";

import db from "@/db";
import { clientsTable, projectsTable, usersTable } from "@/db/schema";
import projectFormSchema, {
  ProjectFormSchema,
} from "@/features/projects/zod-schema";

export const getProjects = async (accountId: string) => {
  try {
    const projects = await db
      .select({
        name: projectsTable.name,
        description: projectsTable.description,
        budget: projectsTable.budget,
        status: projectsTable.status,
        startDate: projectsTable.startDate,
        endDate: projectsTable.endDate,
      })
      .from(projectsTable)
      .leftJoin(usersTable, eq(projectsTable.userId, usersTable.id))
      .where(eq(usersTable.appwriteId, accountId))
      .orderBy(desc(projectsTable.createdAt), desc(projectsTable.updatedAt))
      .execute();
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};

export const getClientsIdAndName = async (userId: string) => {
  try {
    const clients = await db
      .select({
        id: clientsTable.id,
        name: clientsTable.name,
      })
      .from(clientsTable)
      .leftJoin(usersTable, eq(clientsTable.userId, usersTable.id))
      .where(eq(usersTable.id, userId))
      .orderBy(desc(clientsTable.createdAt), desc(clientsTable.updatedAt))
      .execute();
    return clients;
  } catch (error) {
    console.error("Error getting clients:", error);
    throw error;
  }
};

export const createProject = async ({
  name,
  description,
  content,
  userId,
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
      userId: userId,
      clientId: clientId,
      budget: budget,
      status: status,
      startDate: startDate,
      endDate: endDate,
    });

    await db
      .insert(projectsTable)
      .values({
        name: validatedProject.name,
        description: validatedProject.description,
        content: validatedProject.content,
        userId: validatedProject.userId,
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

export const getUserIdByAppwriteId = async (appwriteId: string) => {
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
