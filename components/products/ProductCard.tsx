import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded bg-white shadow relative p-5">
      <div className={`${!isAvailable(product.stock) && "opacity-40"}`}>
        <Image
          src={getImagePath(product.image)}
          alt={product.name}
          width={400}
          height={600}
          className="w-full h-64 object-contain"
          priority
        />
        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
          <p className="text-gray-500">In stock: {product.stock}</p>
          <p className="text-2xl font-extrabold  text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      {isAvailable(product.stock) ? (
        <AddProductButton product={product} />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-80 bg-black/60 flex items-center justify-center rounded">
          <p className="bg-red-600 text-white text-3xl px-2 font-bold">
            Out of stock
          </p>
        </div>
      )}
    </div>
  );
}
