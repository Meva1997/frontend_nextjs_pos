"use client";

import {} from "@/actions/add-product-action";
import { editProduct } from "@/actions/edit-product-action";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;

  const editProductWithId = editProduct.bind(null, +id);
  const [state, dispatch] = useActionState(editProductWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push("/admin/products");
    }
    if (state.errors.length) {
      state.errors.forEach((err) => toast.error(err));
    }
  }, [state, router]);

  return (
    <>
      <form action={dispatch} className="space-y-5 mt-5">
        {children}
        <input
          type="submit"
          className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer mt-5"
          value="Save Changes"
        />
      </form>
    </>
  );
}
