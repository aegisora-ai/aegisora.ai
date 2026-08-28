import { redirect } from "next/navigation";

export default function RuntimeRootPage() {
  redirect("/dashboard/runtime/performance");
}
