"use server";

import { cookies } from "next/headers";

import { ID, Query } from "node-appwrite";

import db from "@/db";
import { usersTable } from "@/db/schema";
import { createAdminClient } from "@/lib/appwrite";
import { parseStringify } from "@/lib/utils";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    [Query.equal("email", [email])],
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw new Error(message);
};

export const createAccount = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP(email);

  if (!accountId) throw new Error("Failed to send email OTP");

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
      ID.unique(),
      {
        name,
        email,
        accountId,
      },
    );

    await db
      .insert(usersTable)
      .values({
        name: name,
        email: email,
        appwriteId: accountId,
        createdAt: new Date(),
      })
      .execute();
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP(email);
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
