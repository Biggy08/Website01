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
  leaderName: "Aashish Sharma",
  leaderRole: "Founder & Lead Systems Architect",
  leaderAvatarUrl: "/images/leader_portrait.jpg",
  leaderMessage:
    "When we established Aadhi Code, our purpose was clear: build software that solves real problems with uncompromising craft. In an industry often distracted by hype, we choose clarity, architectural stability, and genuine long-term partnerships. Every system we launch is designed to stand the test of scale and time.",
};

export function ensurePublicAssets(): void {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const imgDir = path.join(publicDir, "images");
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    const brainDir = "C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\e4447b82-d320-4b82-824e-d1e6bf8a9348";
    const visionSrc = path.join(brainDir, "tech_vision_concept_1790423059439.jpg");
    const leaderSrc = path.join(brainDir, "leader_portrait_1790423080920.jpg");

    const visionDest = path.join(imgDir, "tech_vision.jpg");
    const leaderDest = path.join(imgDir, "leader_portrait.jpg");

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
      leaderAvatarUrl: parsed.leaderAvatarUrl?.trim() || DEFAULT_LEADER_INFO.leaderAvatarUrl,
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
