import { redirect } from "next/navigation";

export default function IntegrationsRootPage() {
  redirect("/dashboard/integrations/connected-apps");
}
