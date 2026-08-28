import { redirect } from "next/navigation";

export default function LiveMonitorRootPage() {
  redirect("/dashboard/live-monitor/executions");
}
