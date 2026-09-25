export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const MANAGER_PERMISSION_AREAS = [
  "posts",
  "jobs",
  "results",
  "translations",
  "media",
  "homepage",
  "tools",
  "notifications",
  "analytics",
] as const;

export type ManagerPermission =
  (typeof MANAGER_PERMISSION_AREAS)[number];