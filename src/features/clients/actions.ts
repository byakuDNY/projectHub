"use server";

import { revalidatePath } from "next/cache";

import { desc } from "drizzle-orm";

import db from "@/db";
import { clientsTable } from "@/db/schema";
import { InsertClientsType } from "@/db/schema/clients-table";

export const getClients = async () => {
  try {
    const clients = await db
      .select()
      .from(clientsTable)
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
      })
      .execute();

    revalidatePath("/dashboard/clients");
  } catch (error) {
    console.error("Error add client:", error);
    throw error;
  }
};
