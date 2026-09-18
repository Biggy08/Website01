"use client";

import { useState } from "react";
import { createTeamMember, updateTeamMember } from "@/app/actions";

type TeamMember = {
  id?: number;
  name: string;
  role: string;
  bio: string | null;
};

export default function TeamMemberForm({ member, onCancel }: { member?: TeamMember, onCancel: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (member?.id) {
        await updateTeamMember(member.id, formData);
      } else {
        await createTeamMember(formData);
      }
      onCancel(); // Close form on success
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "var(--primary-color)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)", marginBottom: "2rem" }}>
      <h3>{member ? "Edit Team Member" : "Add New Team Member"}</h3>
      
      <div className="form-group">
        <label>Name *</label>
        <input name="name" defaultValue={member?.name} required minLength={2} />
      </div>

      <div className="form-group">
        <label>Role *</label>
        <input name="role" defaultValue={member?.role} required minLength={2} />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea name="bio" defaultValue={member?.bio || ""} rows={3} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "var(--primary-color)", color: "var(--text-main)", fontFamily: "inherit" }} />
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button type="submit" className="login-button" disabled={loading} style={{ margin: 0 }}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "transparent", color: "var(--text-main)", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
