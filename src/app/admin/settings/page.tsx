import { prisma } from "@/lib/prisma";
import { updateCompanySettings } from "@/app/actions";
import { parseLeaderInfo, ensurePublicAssets } from "@/lib/leader";

export default async function SettingsPage() {
  ensurePublicAssets();

  const settings = await prisma.companyInfo.findUnique({
    where: { id: 1 },
  });

  const leaderInfo = parseLeaderInfo(settings);

  return (
    <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Company & Leadership Settings</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Manage global company information, the guiding quote, and the message from leadership featured on the public website.
        </p>
      </div>

      <form action={updateCompanySettings} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* SECTION A: GUIDING QUOTE & SUPPORTING STATEMENTS */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.25rem" }}>💡</span>
            <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Guiding Quote & Supporting Statements</h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            Featured above &quot;Overview and Mission&quot; with the tech vision artwork on the right.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                Main Quote (Displayed in Big Typography)
              </label>
              <input
                type="text"
                name="leaderQuote"
                defaultValue={leaderInfo.quote}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #30363d",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-main)",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                Supporting Statements (Underneath Quote)
              </label>
              <textarea
                name="leaderSupportingText"
                defaultValue={leaderInfo.supportingText}
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #30363d",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-main)",
                  fontFamily: "inherit",
                  fontSize: "0.925rem",
                  lineHeight: 1.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* SECTION B: MESSAGE FROM LEADERS */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.25rem" }}>👑</span>
            <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Message from Our Leaders</h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            Edit the leader profile placeholder and their official message displayed below the quote.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                  Leader Name
                </label>
                <input
                  type="text"
                  name="leaderName"
                  defaultValue={leaderInfo.leaderName}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #30363d",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--text-main)",
                  }}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                  Role / Title
                </label>
                <input
                  type="text"
                  name="leaderRole"
                  defaultValue={leaderInfo.leaderRole}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #30363d",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--text-main)",
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                Profile Avatar / Photo URL
              </label>
              <input
                type="text"
                name="leaderAvatarUrl"
                defaultValue={leaderInfo.leaderAvatarUrl}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #30363d",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-main)",
                }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>
                Default photo: /images/founder.png
              </span>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>Upload founder photo</label>
              <input name="leaderAvatar" type="file" accept="image/png,image/jpeg,image/webp" />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem", display: "block" }}>Optional; PNG, JPG, or WebP up to 5MB. This replaces the URL above.</span>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                Message from Leadership
              </label>
              <textarea
                name="leaderMessage"
                defaultValue={leaderInfo.leaderMessage}
                rows={5}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #30363d",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-main)",
                  fontFamily: "inherit",
                  fontSize: "0.925rem",
                  lineHeight: 1.6,
                }}
              />
            </div>
          </div>
        </div>

        {/* SECTION C: GENERAL COMPANY SETTINGS */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🏢</span>
            <h2 style={{ fontSize: "1.25rem", margin: 0 }}>General Company Info</h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            Basic contact details and mission statement.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                Mission Statement
              </label>
              <textarea
                name="missionStatement"
                defaultValue={settings?.missionStatement || ""}
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #30363d",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-main)",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={settings?.email || ""}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #30363d",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--text-main)",
                  }}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={settings?.phone || ""}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #30363d",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--text-main)",
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem", display: "block" }}>
                Office Address
              </label>
              <input
                type="text"
                name="address"
                defaultValue={settings?.address || ""}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #30363d",
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-main)",
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "var(--accent-color)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
