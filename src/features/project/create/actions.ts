"use server";

import { revalidatePath } from "next/cache";

import { desc } from "drizzle-orm";

import db from "@/db";
import { projectsTable } from "@/db/schema";
import { ProjectsType } from "@/db/schema/projects-table";

export const getprojects = async () => {
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

export const insertproject = async ({
  name,
  email,
  phone,
  country,
}: ProjectsType) => {
  try {
    await db
      .insert(projectsTable)
      .values({
        name: name,
        email: email,
        phone: phone,
        country: country,
      })
      .execute();

    revalidatePath("/dashboard/projects");
  } catch (error) {
    console.error("Error add project:", error);
    throw error;
  }
};
