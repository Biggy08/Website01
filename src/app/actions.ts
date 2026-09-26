"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { serializeLeaderInfo } from "@/lib/leader";
import fs from "fs/promises";
import path from "path";

async function saveImage(file: FormDataEntryValue | null, currentUrl?: string | null) {
  if (!(file instanceof File) || file.size === 0) return currentUrl || null;
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) throw new Error("Use an image smaller than 5MB.");
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${crypto.randomUUID()}.${extension}`;
  const directory = path.join(process.cwd(), "public", "images", "uploads");
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return `/images/uploads/${filename}`;
}

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function updateCompanySettings(formData: FormData) {
  await requireAuth();

  const missionStatement = formData.get("missionStatement") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  const quote = (formData.get("leaderQuote") as string) || undefined;
  const supportingText = (formData.get("leaderSupportingText") as string) || undefined;
  const leaderName = (formData.get("leaderName") as string) || undefined;
  const leaderRole = (formData.get("leaderRole") as string) || undefined;
  const leaderAvatarUrl = await saveImage(formData.get("leaderAvatar"), (formData.get("leaderAvatarUrl") as string) || "/images/founder.png") || undefined;
  const leaderMessage = (formData.get("leaderMessage") as string) || undefined;

  const linkedinLink = serializeLeaderInfo({
    quote,
    supportingText,
    leaderName,
    leaderRole,
    leaderAvatarUrl,
    leaderMessage,
  });

  await prisma.companyInfo.upsert({
    where: { id: 1 },
    update: { missionStatement, email, phone, address, linkedinLink },
    create: {
      id: 1,
      missionStatement,
      email,
      phone,
      address,
      linkedinLink,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/info");
}

export async function createTeamMember(formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const imageUrl = await saveImage(formData.get("image"), formData.get("imageUrl") as string);

  await prisma.teamMember.create({
    data: { name, role, bio, imageUrl }
  });

  revalidatePath("/admin/team");
  revalidatePath("/info");
}

export async function deleteTeamMember(id: number) {
  await requireAuth();

  await prisma.teamMember.delete({
    where: { id }
  });

  revalidatePath("/admin/team");
  revalidatePath("/info");
}

export async function updateTeamMember(id: number, formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const current = await prisma.teamMember.findUnique({ where: { id } });
  const imageUrl = await saveImage(formData.get("image"), current?.imageUrl);

  await prisma.teamMember.update({
    where: { id },
    data: { name, role, bio, imageUrl }
  });

  revalidatePath("/admin/team");
  revalidatePath("/info");
}

export async function createProject(formData: FormData) {
  await requireAuth();
  await prisma.project.create({ data: { title: String(formData.get("title")), description: String(formData.get("description")), link: String(formData.get("link") || "") || null, imageUrl: await saveImage(formData.get("image")) } });
  revalidatePath("/admin/projects"); revalidatePath("/info");
}
export async function updateProject(id: number, formData: FormData) {
  await requireAuth(); const current = await prisma.project.findUnique({ where: { id } });
  await prisma.project.update({ where: { id }, data: { title: String(formData.get("title")), description: String(formData.get("description")), link: String(formData.get("link") || "") || null, imageUrl: await saveImage(formData.get("image"), current?.imageUrl) } });
  revalidatePath("/admin/projects"); revalidatePath("/info");
}
export async function deleteProject(id: number) { await requireAuth(); await prisma.project.delete({ where: { id } }); revalidatePath("/admin/projects"); revalidatePath("/info"); }

export async function createCollaboration(formData: FormData) {
  await requireAuth(); await prisma.collaboration.create({ data: { partnerName: String(formData.get("partnerName")), description: String(formData.get("description") || "") || null, logoUrl: await saveImage(formData.get("logo")) } });
  revalidatePath("/admin/collaborations"); revalidatePath("/info");
}
export async function updateCollaboration(id: number, formData: FormData) {
  await requireAuth(); const current = await prisma.collaboration.findUnique({ where: { id } });
  await prisma.collaboration.update({ where: { id }, data: { partnerName: String(formData.get("partnerName")), description: String(formData.get("description") || "") || null, logoUrl: await saveImage(formData.get("logo"), current?.logoUrl) } });
  revalidatePath("/admin/collaborations"); revalidatePath("/info");
}
export async function deleteCollaboration(id: number) { await requireAuth(); await prisma.collaboration.delete({ where: { id } }); revalidatePath("/admin/collaborations"); revalidatePath("/info"); }
