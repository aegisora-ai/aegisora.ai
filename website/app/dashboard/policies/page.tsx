import { redirect } from "next/navigation";

export default function PoliciesRootPage() {
  redirect("/dashboard/policies/policy-library");
}
