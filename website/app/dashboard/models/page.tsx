import { redirect } from "next/navigation";

export default function ModelsRootPage() {
  redirect("/dashboard/models/registry");
}
