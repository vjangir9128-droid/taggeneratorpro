import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface TrialUser {
  email: string;
  isVerified: boolean;
  verificationToken?: string;
  tokenExpiresAt?: number;
  trialStartedAt?: number;
  trialExpiresAt?: number;
  createdAt: number;
}

export interface TrialStatus {
  email: string;
  isVerified: boolean;
  isActive: boolean;
  isExpired: boolean;
  daysLeft: number;
  hoursLeft: number;
  expiresAtFormatted?: string;
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const DATA_DIR = path.join(process.cwd(), "data");
const TRIALS_FILE = path.join(DATA_DIR, "trials.json");

// In-memory cache backed by JSON file
const trialsMap = new Map<string, TrialUser>();

function loadTrials() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(TRIALS_FILE)) {
      const data = fs.readFileSync(TRIALS_FILE, "utf8");
      const list: TrialUser[] = JSON.parse(data);
      for (const u of list) {
        trialsMap.set(u.email.toLowerCase(), u);
      }
    }
  } catch (err) {
    console.warn("Failed to read trials.json:", err);
  }
}

function persistTrials() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const list = Array.from(trialsMap.values());
    fs.writeFileSync(TRIALS_FILE, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to persist trials.json:", err);
  }
}

// Initial load
loadTrials();

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Creates or updates an unverified trial user and generates a secure verification token.
 */
export function createVerificationToken(email: string): {
  user: TrialUser;
  token: string;
  isNewUser: boolean;
} {
  const cleanEmail = email.trim().toLowerCase();
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();
  const tokenExpiresAt = now + TOKEN_EXPIRY_MS;

  let existing = trialsMap.get(cleanEmail);
  const isNewUser = !existing;

  if (existing) {
    existing.verificationToken = token;
    existing.tokenExpiresAt = tokenExpiresAt;
  } else {
    existing = {
      email: cleanEmail,
      isVerified: false,
      verificationToken: token,
      tokenExpiresAt,
      createdAt: now,
    };
    trialsMap.set(cleanEmail, existing);
  }

  persistTrials();
  return { user: existing, token, isNewUser };
}

/**
 * Verifies a token and activates the 7-day free trial.
 */
export function verifyEmailToken(token: string): {
  success: boolean;
  email?: string;
  error?: string;
  trialStatus?: TrialStatus;
} {
  const cleanToken = token.trim();
  const now = Date.now();

  let matchedUser: TrialUser | undefined;
  for (const u of trialsMap.values()) {
    if (u.verificationToken === cleanToken) {
      matchedUser = u;
      break;
    }
  }

  if (!matchedUser) {
    return { success: false, error: "Invalid verification link or token not found." };
  }

  if (matchedUser.tokenExpiresAt && now > matchedUser.tokenExpiresAt) {
    return { success: false, error: "This verification link has expired. Please request a new one." };
  }

  // Activate 7-day trial if not already active
  if (!matchedUser.isVerified || !matchedUser.trialExpiresAt) {
    matchedUser.isVerified = true;
    matchedUser.trialStartedAt = now;
    matchedUser.trialExpiresAt = now + SEVEN_DAYS_MS;
    delete matchedUser.verificationToken;
    delete matchedUser.tokenExpiresAt;
  }

  persistTrials();
  const status = getTrialStatus(matchedUser.email);

  return {
    success: true,
    email: matchedUser.email,
    trialStatus: status,
  };
}

/**
 * Get real-time trial status for an email.
 */
export function getTrialStatus(email: string): TrialStatus {
  const cleanEmail = email.trim().toLowerCase();
  const user = trialsMap.get(cleanEmail);
  const now = Date.now();

  if (!user || !user.isVerified || !user.trialExpiresAt) {
    return {
      email: cleanEmail,
      isVerified: false,
      isActive: false,
      isExpired: false,
      daysLeft: 0,
      hoursLeft: 0,
    };
  }

  const diffMs = user.trialExpiresAt - now;
  const isExpired = diffMs <= 0;
  const daysLeft = isExpired ? 0 : Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  const hoursLeft = isExpired ? 0 : Math.ceil(diffMs / (60 * 60 * 1000));

  const expiresDate = new Date(user.trialExpiresAt);
  const expiresAtFormatted = expiresDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    email: cleanEmail,
    isVerified: true,
    isActive: !isExpired,
    isExpired,
    daysLeft,
    hoursLeft,
    expiresAtFormatted,
  };
}
