import Link from "next/link";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Aadi Code Pvt Ltd Admin</h2>
        <nav className="admin-nav">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/admin/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/admin/team" className="nav-link">Team Members</Link>
          <Link href="/admin/projects" className="nav-link">Projects</Link>
          <Link href="/admin/collaborations" className="nav-link">Collaborations</Link>
          <Link href="/admin/settings" className="nav-link">Company Settings</Link>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
