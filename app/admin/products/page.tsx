import { redirect } from "next/navigation";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { productsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Pagintations from "@/components/ui/Pagintations";
import Link from "next/link";

async function getproducts(take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
  const request = await fetch(url);
  const json = await request.json();
  const data = productsResponseSchema.parse(json);
  return {
    products: data.products,
    total: data.total,
  };
}

type SearchParams = Promise<{ page: string }>;

export default async function productPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
  if (!isValidPage(+page)) {
    return redirect("/admin/products?page=1");
  }

  const productsPerPage = 10;
  const skip = (+page - 1) * productsPerPage;
  const { products, total } = await getproducts(productsPerPage, skip);

  const totalPages = Math.ceil(total / productsPerPage);
  if (+page > totalPages && totalPages !== 0) {
    return redirect(`/admin/products?page=${totalPages}`);
  }

  return (
    <>
      <Link
        href="/admin/products/new"
        className="rounded bg-green-400 font-bold py-2 px-10"
      >
        New Product
      </Link>
      <Heading>Administrate your products</Heading>
      <ProductsTable products={products} />

      <Pagintations
        page={+page}
        totalPages={totalPages}
        baseUrl="/admin/products"
      />
    </>
  );
}
