import fs from "fs";
import path from "path";

export interface LeaderInfo {
  quote: string;
  supportingText: string;
  leaderName: string;
  leaderRole: string;
  leaderAvatarUrl: string;
  leaderMessage: string;
}

export const DEFAULT_LEADER_INFO: LeaderInfo = {
  quote: "Possible, Practical and Plausible",
  supportingText:
    "Technology should never be built for novelty alone. We evaluate every ambition through three uncompromising lenses: Is it possible within technical realities? Is it practical to engineer, deploy, and maintain? And is it plausible that it delivers lasting enterprise and user value? Grounded in rigor, driven by purpose.",
  leaderName: "Nabin Thapa",
  leaderRole: "Founder & Lead Systems Architect",
  leaderAvatarUrl: "/images/founder.png",
  leaderMessage:
    "At Aadi Code Pvt Ltd, our purpose is clear: build software that solves real problems with uncompromising craft. We choose clarity, architectural stability, and genuine long-term partnerships.",
};

export function ensurePublicAssets(): void {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const imgDir = path.join(publicDir, "images");
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    const assetDir = path.join(process.cwd(), "assets");
    const visionSrc = path.join(assetDir, "tech_vision.jpg");
    const leaderSrc = path.join(assetDir, "Founder.png");

    const visionDest = path.join(imgDir, "tech_vision.jpg");
    const leaderDest = path.join(imgDir, "founder.png");

    if (fs.existsSync(visionSrc) && !fs.existsSync(visionDest)) {
      fs.copyFileSync(visionSrc, visionDest);
    }
    if (fs.existsSync(leaderSrc) && !fs.existsSync(leaderDest)) {
      fs.copyFileSync(leaderSrc, leaderDest);
    }
  } catch (err) {
    console.warn("Asset sync check:", err);
  }
}

export function parseLeaderInfo(companyInfo: { linkedinLink?: string | null } | null | undefined): LeaderInfo {
  if (!companyInfo?.linkedinLink) {
    return DEFAULT_LEADER_INFO;
  }
  try {
    const parsed = JSON.parse(companyInfo.linkedinLink);
    return {
      quote: parsed.quote?.trim() || DEFAULT_LEADER_INFO.quote,
      supportingText: parsed.supportingText?.trim() || DEFAULT_LEADER_INFO.supportingText,
      leaderName: parsed.leaderName?.trim() || DEFAULT_LEADER_INFO.leaderName,
      leaderRole: parsed.leaderRole?.trim() || DEFAULT_LEADER_INFO.leaderRole,
      leaderAvatarUrl: parsed.leaderAvatarUrl?.trim() === "/images/leader_portrait.jpg" ? "/images/founder.png" : (parsed.leaderAvatarUrl?.trim() || DEFAULT_LEADER_INFO.leaderAvatarUrl),
      leaderMessage: parsed.leaderMessage?.trim() || DEFAULT_LEADER_INFO.leaderMessage,
    };
  } catch {
    return DEFAULT_LEADER_INFO;
  }
}

export function serializeLeaderInfo(info: Partial<LeaderInfo>): string {
  return JSON.stringify({
    quote: info.quote || DEFAULT_LEADER_INFO.quote,
    supportingText: info.supportingText || DEFAULT_LEADER_INFO.supportingText,
    leaderName: info.leaderName || DEFAULT_LEADER_INFO.leaderName,
    leaderRole: info.leaderRole || DEFAULT_LEADER_INFO.leaderRole,
    leaderAvatarUrl: info.leaderAvatarUrl || DEFAULT_LEADER_INFO.leaderAvatarUrl,
    leaderMessage: info.leaderMessage || DEFAULT_LEADER_INFO.leaderMessage,
  });
}
