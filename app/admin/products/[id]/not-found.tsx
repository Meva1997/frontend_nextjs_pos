import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
      <p className="mb-4">The product you are looking for does not exist.</p>
      <Link
        href="/admin/products"
        className="rounded bg-green-400 px-4 py-2 font-bold hover:bg-green-500"
      >
        Back to Products
      </Link>
    </div>
  );
}
