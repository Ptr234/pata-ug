/**
 * Reads user profile from localStorage.
 * Falls back to role-specific defaults for demo/preview mode.
 */

export interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  role: "tenant" | "landlord" | "admin";
  verificationStatus: "unverified" | "pending" | "verified";
  initials: string;
}

const DEFAULTS: Record<string, UserProfile> = {
  tenant: {
    fullName: "John Doe",
    phone: "+256700100100",
    email: "john.doe@email.com",
    nationalId: "CM9300012345678A",
    role: "tenant",
    verificationStatus: "verified",
    initials: "JD",
  },
  landlord: {
    fullName: "Sarah Namutebi",
    phone: "+256772200200",
    email: "sarah.namutebi@email.com",
    nationalId: "CF8200098765432B",
    role: "landlord",
    verificationStatus: "verified",
    initials: "SN",
  },
  admin: {
    fullName: "Admin Pata",
    phone: "+256700000001",
    email: "admin@pata.ug",
    nationalId: "",
    role: "admin",
    verificationStatus: "verified",
    initials: "AP",
  },
};

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULTS.tenant;

  const role = localStorage.getItem("pata-role") || "tenant";
  const stored = localStorage.getItem("pata-user");

  if (stored) {
    try {
      const data = JSON.parse(stored);
      const name = data.fullName || DEFAULTS[role]?.fullName || "User";
      const initials = name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return {
        fullName: name,
        phone: data.phone || "",
        email: data.email || "",
        nationalId: data.nationalId || "",
        role: (data.role || role) as UserProfile["role"],
        verificationStatus: data.verificationStatus || "pending",
        initials,
      };
    } catch {
      // fall through to defaults
    }
  }

  return DEFAULTS[role] || DEFAULTS.tenant;
}

export function getFirstName(profile: UserProfile): string {
  return profile.fullName.split(" ")[0];
}
