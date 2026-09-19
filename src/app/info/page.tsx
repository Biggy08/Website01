import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function InfoPage() {
  // Fetch real team members from database if any exist, fallback to curated placeholders
  let dbTeamMembers: Array<{ id: number; name: string; role: string; bio: string | null }> = [];
  let dbCompanyInfo: {
    missionStatement?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null = null;

  try {
    dbTeamMembers = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    dbCompanyInfo = await prisma.companyInfo.findUnique({
      where: { id: 1 },
    });
  } catch (err) {
    console.warn("Could not query DB directly during render, using fallback data:", err);
  }

  const placeholderMembers = [
    {
      name: "Aashish Sharma",
      role: "Lead Systems Architect & Founder",
      bio: "10+ years shaping distributed cloud architectures, scalable web microservices, and leading agile engineering teams.",
      initials: "AS",
    },
    {
      name: "Prashant Karki",
      role: "Senior Full Stack Engineer",
      bio: "Specialist in React/Next.js ecosystem, TypeScript, high-throughput REST/GraphQL APIs, and database performance tuning.",
      initials: "PK",
    },
    {
      name: "Samikshya Adhikari",
      role: "Product Designer & UX Researcher",
      bio: "Creating user-centric, accessible, and intuitive digital interfaces with seamless interactive experiences.",
      initials: "SA",
    },
    {
      name: "Rohan Thapa",
      role: "DevOps & Cloud Security Specialist",
      bio: "Automating robust CI/CD deployment pipelines, Kubernetes orchestrations, and cloud infrastructure monitoring.",
      initials: "RT",
    },
  ];

  const teamList =
    dbTeamMembers.length > 0
      ? dbTeamMembers.map((m) => ({
          name: m.name,
          role: m.role,
          bio: m.bio || "Passionate engineer bringing solutions to life at Aadhi Code.",
          initials: m.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
        }))
      : placeholderMembers;

  const previousWorks = [
    {
      title: "FinFlow Enterprise Banking Portal",
      client: "FinFlow Solutions",
      category: "Fintech / Cloud App",
      description:
        "Engineered a resilient high-concurrency payment and ledger processing dashboard with real-time audit logs and multi-factor authentication.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    },
    {
      title: "Himalayan Logistics Dispatch Tracker",
      client: "Trans-Himalaya Cargo",
      category: "Logistics / Telemetry",
      description:
        "Real-time route optimization and freight fleet monitoring platform serving mountainous transport corridors across Nepal.",
      tags: ["React", "Node.js", "WebSockets", "Mapbox"],
    },
    {
      title: "MedSync Telemedicine Suite",
      client: "HealthCare Network",
      category: "HealthTech / SaaS",
      description:
        "HIPAA-compliant remote consultation platform linking certified doctors with patients across regional clinics.",
      tags: ["WebRTC", "Next.js", "Prisma", "Tailored Security"],
    },
  ];

  const currentProjects = [
    {
      title: "Aadhi Intelligence (Aadhi AI)",
      status: "In Active Beta",
      description:
        "An automated document intelligence & semantic search pipeline tailored for multilingual legal and business archives in South Asia.",
      progress: "85%",
    },
    {
      title: "OpenGov Citizen Service Gateway",
      status: "Phase 2 Deployment",
      description:
        "Public sector modernization initiative streamlining digital municipal requests, verification workflows, and citizen identity verification.",
      progress: "60%",
    },
    {
      title: "MicroCommerce Core",
      status: "Architecture & Prototyping",
      description:
        "Headless, ultra-fast e-commerce engine designed for frictionless checkout experiences on lower-bandwidth mobile networks.",
      progress: "40%",
    },
  ];

  const manpowerCapabilities = [
    {
      domain: "Frontend & Mobile Engineering",
      icon: "💻",
      details: "React, Next.js, React Native, TypeScript, TailwindCSS, Progressive Web Applications, and Web Performance Auditing.",
    },
    {
      domain: "Backend, APIs & Databases",
      icon: "⚙️",
      details: "Node.js, Python FastAPI, Go, PostgreSQL, Redis, GraphQL, Prisma ORM, and secure transaction workflows.",
    },
    {
      domain: "Cloud, DevOps & SRE",
      icon: "☁️",
      details: "AWS, GCP, Docker, Kubernetes, CI/CD automated test suites, Terraform IaC, and 99.9% uptime site reliability.",
    },
    {
      domain: "UI/UX & Product Design",
      icon: "🎨",
      details: "Design systems, wireframing, high-fidelity prototyping, accessibility testing (WCAG), and responsive UX ergonomics.",
    },
  ];

  const collaborations = [
    {
      name: "Kathmandu Tech Incubator",
      type: "Academic & Research Partner",
      description: "Mentoring upcoming software engineering graduates and joint workshops on modern software craftsmanship.",
    },
    {
      name: "Global Cloud Alliance",
      type: "Infrastructure Partner",
      description: "Provisioning high-availability infrastructure clusters and resilient compute nodes for client rollouts.",
    },
    {
      name: "South Asia Open Source Guild",
      type: "Community Contributor",
      description: "Actively contributing to open-source developer tooling, libraries, and developer-first documentation.",
    },
  ];

  return (
    <div>
      <Navbar showBackHome={true} />

      <main className="sections-wrapper">
        {/* SECTION 1: ABOUT US */}
        <section id="about" className="content-section">
          <div className="section-header">
            <span className="section-tag">01 • Overview & Mission</span>
            <h2 className="section-title">About Aadhi Code</h2>
            <p className="section-description">
              {dbCompanyInfo?.missionStatement ||
                "Aadhi Code helps organizations turn ambitious ideas into dependable digital products through thoughtful engineering, modern architecture, and collaborative craftsmanship."}
            </p>
          </div>

          <div className="grid-3">
            <div className="info-card">
              <div className="card-icon">🎯</div>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
                To build dependable, accessible, and high-performance digital tools that empower businesses to scale sustainably and serve their communities effectively.
              </p>
            </div>
            <div className="info-card">
              <div className="card-icon">💡</div>
              <h3 className="card-title">Engineering Philosophy</h3>
              <p className="card-text">
                We prioritize clean code, intuitive user experiences, robust test coverage, and forward-looking system architecture over short-lived shortcuts.
              </p>
            </div>
            <div className="info-card">
              <div className="card-icon">📍</div>
              <h3 className="card-title">Local Presence, Global Standards</h3>
              <p className="card-text">
                Headquartered in <strong>Baluwatar, Kathmandu, Nepal</strong>, our team delivers software solutions aligned with international benchmarks for quality and security.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: MEMBERS */}
        <section id="members" className="content-section">
          <div className="section-header">
            <span className="section-tag">02 • Our Talent</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">
              The engineers, designers, and innovators building reliable digital experiences every single day.
            </p>
          </div>

          <div className="grid-4">
            {teamList.map((member, idx) => (
              <div key={idx} className="info-card">
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "var(--secondary-color)",
                    border: "2px solid var(--accent-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "1.15rem",
                    color: "var(--accent-color)",
                    marginBottom: "1rem",
                  }}
                >
                  {member.initials}
                </div>
                <h3 className="card-title" style={{ fontSize: "1.1rem" }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--accent-color)", fontWeight: "600", marginBottom: "0.5rem" }}>
                  {member.role}
                </p>
                <p className="card-text" style={{ fontSize: "0.875rem" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: PREVIOUS WORKS */}
        <section id="works" className="content-section">
          <div className="section-header">
            <span className="section-tag">03 • Portfolio</span>
            <h2 className="section-title">Previous Works</h2>
            <p className="section-description">
              A curated selection of solutions and platforms we have engineered and launched for our clients.
            </p>
          </div>

          <div className="grid-3">
            {previousWorks.map((work, idx) => (
              <div key={idx} className="info-card">
                <span className="section-tag" style={{ fontSize: "0.7rem", marginBottom: "0.25rem" }}>
                  {work.category}
                </span>
                <h3 className="card-title">{work.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  Client: <strong>{work.client}</strong>
                </p>
                <p className="card-text">{work.description}</p>
                <div style={{ marginTop: "1rem" }}>
                  {work.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="badge-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="content-section">
          <div className="section-header">
            <span className="section-tag">04 • In the Pipeline</span>
            <h2 className="section-title">Active Projects & Initiatives</h2>
            <p className="section-description">
              Here is a look at what our research and development labs are actively advancing right now.
            </p>
          </div>

          <div className="grid-3">
            {currentProjects.map((project, idx) => (
              <div key={idx} className="info-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "999px",
                      backgroundColor: "var(--secondary-color)",
                      color: "var(--accent-color)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    {project.status}
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)" }}>
                    {project.progress}
                  </span>
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-text">{project.description}</p>
                <div
                  style={{
                    width: "100%",
                    height: "6px",
                    backgroundColor: "var(--secondary-color)",
                    borderRadius: "999px",
                    marginTop: "1.25rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: project.progress,
                      height: "100%",
                      backgroundColor: "var(--accent-color)",
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: MANPOWER & CAPABILITIES */}
        <section id="manpower" className="content-section">
          <div className="section-header">
            <span className="section-tag">05 • Technical Capabilities</span>
            <h2 className="section-title">Manpower & Core Expertise</h2>
            <p className="section-description">
              Our multidisciplinary engineering capacity spans across contemporary stacks, infrastructure, and design practices.
            </p>
          </div>

          <div className="grid-2">
            {manpowerCapabilities.map((cap, idx) => (
              <div key={idx} className="info-card" style={{ flexDirection: "row", gap: "1.25rem", alignItems: "flex-start" }}>
                <div className="card-icon" style={{ flexShrink: 0, margin: 0 }}>
                  {cap.icon}
                </div>
                <div>
                  <h3 className="card-title">{cap.domain}</h3>
                  <p className="card-text">{cap.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: COLLABORATIONS */}
        <section id="collaborations" className="content-section">
          <div className="section-header">
            <span className="section-tag">06 • Ecosystem & Partnerships</span>
            <h2 className="section-title">Collaborations</h2>
            <p className="section-description">
              We partner with forward-thinking enterprises, incubators, and developer networks to cultivate long-term impact.
            </p>
          </div>

          <div className="grid-3">
            {collaborations.map((collab, idx) => (
              <div key={idx} className="info-card">
                <div className="card-icon">🤝</div>
                <h3 className="card-title">{collab.name}</h3>
                <span className="section-tag" style={{ fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                  {collab.type}
                </span>
                <p className="card-text">{collab.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: CONTACT */}
        <section id="contact" className="content-section">
          <div className="section-header">
            <span className="section-tag">07 • Get In Touch</span>
            <h2 className="section-title">Contact Our Team</h2>
            <p className="section-description">
              Ready to start your next project or explore a partnership? We would love to hear from you.
            </p>
          </div>

          <div className="contact-container">
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Let&apos;s Build Together</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
                Reach out to schedule a consultation, request technical manpower details, or discuss how Aadhi Code can elevate your digital roadmap.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>📍</span>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>Location</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                      {dbCompanyInfo?.address || "Baluwatar, Kathmandu, Nepal"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>✉️</span>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>Email</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                      {dbCompanyInfo?.email || "contact@aadhicode.com"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>📞</span>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "0.9rem" }}>Phone</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                      {dbCompanyInfo?.phone || "+977-1-4400000"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Aadhi Code. All rights reserved. Baluwatar, Kathmandu, Nepal.</p>
      </footer>
    </div>
  );
}
