import { redirect } from "next/navigation";

export default function ReportsRootPage() {
  redirect("/dashboard/reports/threat-trends");
}
