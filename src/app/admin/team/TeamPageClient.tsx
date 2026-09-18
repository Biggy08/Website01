"use client";

import { useState, useTransition } from "react";
import TeamMemberForm from "@/components/TeamMemberForm";
import { deleteTeamMember } from "@/app/actions";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string | null;
};

export default function TeamPageClient({ members }: { members: TeamMember[] }) {
  const [editingMember, setEditingMember] = useState<TeamMember | undefined>(undefined);
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      startTransition(() => {
        deleteTeamMember(id);
      });
    }
  };

  return (
    <div className="admin-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2>Manage Team Members</h2>
        {!isAdding && !editingMember && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="login-button" 
            style={{ margin: 0, backgroundColor: "#238636" }}
          >
            + Add Member
          </button>
        )}
      </div>

      {(isAdding || editingMember) && (
        <TeamMemberForm 
          member={editingMember} 
          onCancel={() => {
            setIsAdding(false);
            setEditingMember(undefined);
          }} 
        />
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {members.length === 0 ? (
          <p>No team members found. Add one to get started!</p>
        ) : (
          members.map(member => (
            <div key={member.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", backgroundColor: "var(--primary-color)", border: "1px solid var(--border-color)", borderRadius: "8px" }}>
              <div>
                <h4 style={{ color: "var(--accent-color)" }}>{member.name}</h4>
                <p style={{ fontSize: "0.9rem" }}>{member.role}</p>
                {member.bio && <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.8 }}>{member.bio}</p>}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  onClick={() => setEditingMember(member)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "transparent", color: "var(--text-main)", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  disabled={isPending}
                  style={{ padding: "0.5rem 1rem", borderRadius: "6px", border: "none", backgroundColor: "rgba(255, 123, 114, 0.1)", color: "#ff7b72", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
