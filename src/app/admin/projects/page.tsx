import { prisma } from "@/lib/prisma";
import { createProject, deleteProject } from "@/app/actions";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { id: "desc" } });
  return <div className="admin-card"><h1>Manage Previous Works</h1><p style={{ margin: "0.5rem 0 1.5rem", color: "var(--text-muted)" }}>Add portfolio items shown on the public website.</p>
    <form action={createProject} encType="multipart/form-data" style={{ display: "grid", gap: "0.8rem", marginBottom: "2rem" }}>
      <input className="form-input" name="title" placeholder="Project title" required />
      <textarea className="form-textarea" name="description" placeholder="Project description" required rows={3} />
      <input className="form-input" name="link" type="url" placeholder="Project link (optional)" />
      <label>Project image (optional) <input name="image" type="file" accept="image/png,image/jpeg,image/webp" /></label>
      <button className="login-button" style={{ margin: 0, width: "fit-content" }}>Add project</button>
    </form>
    <div style={{ display: "grid", gap: "0.75rem" }}>{projects.map(project => <div key={project.id} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: 8 }}><div>{project.imageUrl && <img src={project.imageUrl} alt="" style={{ width: 50, height: 50, objectFit: "cover", float: "left", marginRight: "0.75rem" }} />}<strong>{project.title}</strong><p>{project.description}</p></div><form action={deleteProject.bind(null, project.id)}><button type="submit">Delete</button></form></div>)}</div>
  </div>;
}
