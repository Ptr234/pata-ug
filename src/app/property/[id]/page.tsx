import { properties } from "@/lib/mock-data";
import { PropertyDetailPage } from "./PropertyDetail";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default function Page() {
  return <PropertyDetailPage />;
}
