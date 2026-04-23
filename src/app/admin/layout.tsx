import { AdminAuthProvider } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin | azim.cc",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
