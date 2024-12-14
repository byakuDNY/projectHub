"use server";

import { revalidatePath } from "next/cache";

import { desc } from "drizzle-orm";

import db from "@/db";
import { clientsTable } from "@/db/schema";
import { ClientsType } from "@/db/schema/clients-table";

export const getClients = async () => {
  try {
    const clients = await db
      .select()
      .from(clientsTable)
      .orderBy(desc(clientsTable.created_at), desc(clientsTable.updated_at))
      .execute();
    return clients;
  } catch (error) {
    console.error("Error getting clients:", error);
    throw error;
  }
};

export const insertClient = async ({
  name,
  email,
  phone,
  country,
}: ClientsType) => {
  try {
    await db
      .insert(clientsTable)
      .values({
        name: name,
        email: email,
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
