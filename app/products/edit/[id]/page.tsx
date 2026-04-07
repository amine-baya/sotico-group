import { EditProductScreen } from "@/app/components/products/EditProductScreen";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditProductScreen productId={id} />;
}
