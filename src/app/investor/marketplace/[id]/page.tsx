import { redirect } from "next/navigation";

export default async function InvestorInvoiceDetailsRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/investor/marketplace/${id}/bid`);
}
