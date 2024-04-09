import { PageHeader } from "@/app/admin/_components/pageHeader";
import { ProductForm } from "../../_components/ProductForms";
import db from "@/db/db";


export default async function EditProductPage({
    params: { id },
} : {
    params: { id: string };
}) {
    const product = await db.product.findUnique({ where: { 
        id } });

  return (
    <>
    <PageHeader>Edit</PageHeader>
    <ProductForm product={product}></ProductForm>
    </>
  );
}