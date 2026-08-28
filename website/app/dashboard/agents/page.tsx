import { redirect } from "next/navigation";

export default function AgentsRootPage() {
  redirect("/dashboard/agents/all-agents");
}
