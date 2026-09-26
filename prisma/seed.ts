import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@aadhicode.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log('Admin user seeded:', user.email);

  if (await prisma.teamMember.count() === 0) {
    await prisma.teamMember.createMany({ data: [
      { name: 'Nabin Thapa', role: 'Founder', bio: 'Leading Aadi Code Pvt Ltd with a focus on reliable, useful digital products.', order: 1, imageUrl: '/images/founder.png' },
      { name: 'Prashant Karki', role: 'Senior Full Stack Engineer', bio: 'Building dependable web applications and APIs.', order: 2 },
      { name: 'Samikshya Adhikari', role: 'Product Designer & UX Researcher', bio: 'Creating accessible, user-focused digital experiences.', order: 3 },
    ] });
  }

  if (await prisma.project.count() === 0) {
    await prisma.project.createMany({ data: [
      { title: 'FinFlow Enterprise Banking Portal', description: 'A resilient payment and ledger dashboard with real-time audit logs.' },
      { title: 'Himalayan Logistics Dispatch Tracker', description: 'Route optimization and freight fleet monitoring for Nepal.' },
      { title: 'MedSync Telemedicine Suite', description: 'A remote consultation platform for regional clinics.' },
    ] });
  }

  if (await prisma.collaboration.count() === 0) {
    await prisma.collaboration.createMany({ data: [
      { partnerName: 'Kathmandu Tech Incubator', description: 'Mentoring and workshops for upcoming software engineers.' },
      { partnerName: 'Global Cloud Alliance', description: 'High-availability infrastructure support for client rollouts.' },
      { partnerName: 'South Asia Open Source Guild', description: 'Contributions to developer tooling and documentation.' },
    ] });
  }

  console.log('Editable placeholder content seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
