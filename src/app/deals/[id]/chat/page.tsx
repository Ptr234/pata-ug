import { deals } from "@/lib/mock-data";
import { TenantChatPage } from "./TenantChat";

export function generateStaticParams() {
  return deals.map((d) => ({ id: d.id }));
}

export default function Page() {
  return <TenantChatPage />;
}
