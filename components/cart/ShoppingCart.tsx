"use client";

import { useStore } from "@/src/store";
import ShoppingCartItem from "./ShoppingCartItem";
import Amount from "./Amount";
import CuponForm from "./CuponForm";
import SubmitFormOrder from "./SubmitFormOrder";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);
  return (
    <>
      {contents.length === 0 ? (
        <p className="text-gray-500 text-center text-xl animate-pulse">
          Your cart is empty
        </p>
      ) : (
        <>
          <h2 className="text-4xl font-bold text-gray-900">Cart</h2>

          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className="space-y-6 border-t border-gray-200 py-6 text-sm font-medium text-gray-500">
            {discount ? (
              <Amount label="Discount" amount={discount} discount={true} />
            ) : null}
            <Amount label="Total" amount={total} />
          </dl>

          <CuponForm />
          <SubmitFormOrder />
        </>
      )}
    </>
  );
}
