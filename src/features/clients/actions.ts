"use server";

import { revalidatePath } from "next/cache";

import { desc, eq } from "drizzle-orm";

import db from "@/db";
import { clientsTable, usersTable } from "@/db/schema";
import { InsertClientsType } from "@/db/schema/clients-table";

export const getClients = async (userId: string) => {
  try {
    const clients = await db
      .select({
        name: clientsTable.name,
        email: clientsTable.email,
        description: clientsTable.description,
        contact: clientsTable.contact,
        phone: clientsTable.phone,
        country: clientsTable.country,
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

export const createClient = async ({
  name,
  email,
  description,
  contact,
  phone,
  country,
  userId,
}: InsertClientsType) => {
  try {
    await db
      .insert(clientsTable)
      .values({
        name: name,
        email: email,
        description: description,
        contact: contact,
        phone: phone,
        country: country,
        userId: userId,
      })
      .execute();

    revalidatePath("/dashboard/clients");
  } catch (error) {
    console.error("Error add client:", error);
    throw error;
  }
};
