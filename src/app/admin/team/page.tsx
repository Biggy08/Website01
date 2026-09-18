import { prisma } from "@/lib/prisma";
import TeamPageClient from "./TeamPageClient";

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  return <TeamPageClient members={members} />;
}
