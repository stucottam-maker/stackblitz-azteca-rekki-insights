export type UserRole = "owner" | "admin" | "member";

export function canManageTeam(role: UserRole) {
  return role === "owner";
}

export function canManageSuppliers(role: UserRole) {
  return role === "owner" || role === "admin";
}

export function canApproveInvoices(role: UserRole) {
  return role === "owner" || role === "admin";
}

export function canDeleteRecords(role: UserRole) {
  return role === "owner" || role === "admin";
}

export function canUseKitchenTools(role: UserRole) {
  return true;
}
