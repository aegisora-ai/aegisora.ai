import { redirect } from "next/navigation";

export default function AuditRootPage() {
  redirect("/dashboard/audit/decisions");
}
