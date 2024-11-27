import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Selyo",
};

export default function Page() {
  const redirectUrl = `/dashboard/attendees`;

  redirect(redirectUrl);

  return null;
}
