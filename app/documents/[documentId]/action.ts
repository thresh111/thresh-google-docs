"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const { sessionClaims } = await auth();

  const clerk = await clerkClient();

  const response = await clerk.users.getUserList({
    organizationId: [(sessionClaims!.o as { id: string }).id],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
}
