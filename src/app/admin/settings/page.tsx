import { prisma } from "@/lib/prisma";
import { updateCompanySettings } from "@/app/actions";

export default async function SettingsPage() {
  const settings = await prisma.companyInfo.findUnique({
    where: { id: 1 }
  });

  return (
    <div className="admin-card">
      <h2>Company Settings</h2>
      <p>Update the global information that appears on the public website.</p>
      
      <form action={updateCompanySettings} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem", maxWidth: "500px" }}>
        
        <div className="form-group">
          <label>Mission Statement</label>
          <textarea 
            name="missionStatement" 
            defaultValue={settings?.missionStatement || ""} 
            rows={4}
            style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #30363d", backgroundColor: "var(--primary-color)", color: "var(--text-main)", fontFamily: "inherit" }}
          />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" name="email" defaultValue={settings?.email || ""} />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone" defaultValue={settings?.phone || ""} />
        </div>

        <div className="form-group">
          <label>Office Address</label>
          <input type="text" name="address" defaultValue={settings?.address || ""} />
        </div>

        <button type="submit" className="login-button">Save Settings</button>
      </form>
    </div>
  );
}
