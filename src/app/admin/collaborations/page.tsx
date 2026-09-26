import { prisma } from "@/lib/prisma";
import { createCollaboration, deleteCollaboration } from "@/app/actions";

export default async function CollaborationsPage() {
  const collaborations = await prisma.collaboration.findMany({ orderBy: { id: "desc" } });
  return <div className="admin-card"><h1>Manage Collaborations</h1><p style={{ margin: "0.5rem 0 1.5rem", color: "var(--text-muted)" }}>Add partners displayed on the public website.</p>
    <form action={createCollaboration} encType="multipart/form-data" style={{ display: "grid", gap: "0.8rem", marginBottom: "2rem" }}>
      <input className="form-input" name="partnerName" placeholder="Partner name" required />
      <textarea className="form-textarea" name="description" placeholder="Description (optional)" rows={3} />
      <label>Partner logo (optional) <input name="logo" type="file" accept="image/png,image/jpeg,image/webp" /></label>
      <button className="login-button" style={{ margin: 0, width: "fit-content" }}>Add collaboration</button>
    </form>
    <div style={{ display: "grid", gap: "0.75rem" }}>{collaborations.map(item => <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: 8 }}><div>{item.logoUrl && <img src={item.logoUrl} alt="" style={{ width: 50, height: 50, objectFit: "contain", float: "left", marginRight: "0.75rem" }} />}<strong>{item.partnerName}</strong><p>{item.description}</p></div><form action={deleteCollaboration.bind(null, item.id)}><button type="submit">Delete</button></form></div>)}</div>
  </div>;
}
