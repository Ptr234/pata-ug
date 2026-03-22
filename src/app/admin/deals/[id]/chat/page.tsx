import { deals } from "@/lib/mock-data";
import { AdminDealChatPage } from "./AdminChat";

export function generateStaticParams() {
  return deals.map((d) => ({ id: d.id }));
}

export default function Page() {
  return <AdminDealChatPage />;
}
