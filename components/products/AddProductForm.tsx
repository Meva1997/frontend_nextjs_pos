"use client";

import { addProduct } from "@/actions/add-product-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useActionState(addProduct, {
    errors: [],
    success: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((err) => toast.error(err));
    }
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products");
    }
  }, [state, router]);

  return (
    <>
      <form action={dispatch} className="space-y-5 mt-5">
        {children}
        <input
          type="submit"
          className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer mt-5"
          value="Add Product"
        />
      </form>
    </>
  );
}
