"use server";

import { eq, sql } from "drizzle-orm";

import db from "@/db";
import {
  clientsTable,
  invoicesTable,
  paymentsTable,
  projectKVTable,
  projectsTable,
} from "@/db/schema";
import { SelectInvoicesType } from "@/db/schema/invoices-table";
import { SelectPaymentsType } from "@/db/schema/payments-table";
import { SelectProjectsType } from "@/db/schema/projects-table";

export const getProjectById = async (projectId: string) => {
  const project: SelectProjectsType[] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, projectId))
    .execute();
  return project[0];
};

export const updateProjectName = async (
  projectId: string,
  projectName: string,
) => {
  await db
    .update(projectsTable)
    .set({ name: projectName })
    .where(eq(projectsTable.id, projectId));
};

export const updateProjectDescription = async (
  id: string,
  description: string,
) => {
  await db
    .update(projectsTable)
    .set({ description: description })
    .where(eq(projectsTable.id, id));
};

export const getProjectClient = async (projectId: string) => {
  const client = await db
    .select({
      name: clientsTable.name,
      description: clientsTable.description,
      contact: clientsTable.contact,
      email: clientsTable.email,
      phone: clientsTable.phone,
      country: clientsTable.country,
    })
    .from(clientsTable)
    .leftJoin(projectsTable, eq(clientsTable.id, projectsTable.clientId))
    .where(eq(projectsTable.id, projectId))
    .execute();

  return client[0];
};

// export const getProjectInvoice = async (projectId: string) => {
//   const invoices = await db
//     .select({
//       invoiceNumber: invoicesTable.amount,
//     })
//     .from(projectsTable)
//     .leftJoin(invoicesTable, eq(projectsTable.clientId, invoicesTable.id))
//     .where(eq(projectsTable.id, projectId))
//     .execute();
//   return invoices;
// };

// export const getProjectPayme = async nts(
//   projectId: string,
// ): Promise<SelectPaymentsType[]> {
//   const invoices = await getProjectInvoices(projectId);
//   const invoiceIds = invoices.map((invoice) => invoice.id);
//   return db
//     .select()
//     .from(paymentsTable)
//     .where(sql`${paymentsTable.invoiceId} IN ${invoiceIds}`);
// }

// export const getProjectPayments = async (projectId: string) => {
//   const invoices = await db
//     .select({
//       invoiceNumber: invoicesTable.amount,
//     })
//     .from(projectsTable)
//     .leftJoin(invoicesTable, eq(projectsTable.clientId, invoicesTable.id))
//     .where(eq(projectsTable.id, projectId))
//     .execute();
//   const invoiceIds = invoices.map((invoice) => invoice.id);
//   return db
//     .select()
//     .from(paymentsTable)
//     .where(sql`${paymentsTable.invoiceId} IN ${invoiceIds}`);
// };

// export const getProjectKV(
//   = async  projectId: string,
// ): Promise<SelectProjectKVType[]> {
//   return db
//     .select()
//     .from(projectKVTable)
//     .where(eq(projectKVTable.projectId, projectId));
// }
export async function getProjectInvoices(
  projectId: string,
): Promise<SelectInvoicesType[]> {
  return db
    .select()
    .from(invoicesTable)
    .where(eq(invoicesTable.projectId, projectId));
}

export async function getProjectPayments(
  projectId: string,
): Promise<SelectPaymentsType[]> {
  const invoices = await getProjectInvoices(projectId);
  const invoiceIds = invoices.map((invoice) => invoice.id);
  return db
    .select()
    .from(paymentsTable)
    .where(sql`${paymentsTable.invoiceId} IN ${invoiceIds}`);
}

export const getProjectKVs = async (projectId: string) => {
  const kvs = await db
    .select({
      key: projectKVTable.key,
      value: projectKVTable.value,
    })
    .from(projectKVTable)
    .where(eq(projectKVTable.projectId, projectId))
    .execute();
  return kvs;
};

export const createProjectKV = async (
  projectId: string,
  key: string,
  value: string,
) => {
  const projectKV = await db
    .insert(projectKVTable)
    .values({ projectId, key, value })
    .execute();
  return projectKV;
};

// export const updateProjectKV = async (
//   id: string,
//   data: Partial<InsertProjectKVType>,
// ): Promise<void> {
//   await db.update(projectKVTable).set(data).where(eq(projectKVTable.id, id));
// }

export const updateProjectKV = async (
  id: string,
  key: string,
  value: string,
) => {
  await db
    .update(projectKVTable)
    .set({ key, value })
    .where(eq(projectKVTable.id, id));
};

export const deleteProjectKV = async (id: string) => {
  await db.delete(projectKVTable).where(eq(projectKVTable.id, id));
};

// export const insertProjectKV = async (
//   data: InsertProjectKVType,
// ): Promise<void> {
//   await db.insert(projectKVTable).values(data);
// }

// export const deleteProjectKV = async (id: string): Promise<void> {
//   await db.delete(projectKVTable).where(eq(projectKVTable.id, id));
// }
