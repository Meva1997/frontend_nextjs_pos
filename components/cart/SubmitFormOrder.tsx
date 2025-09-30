import { submitOrder } from "@/actions/submit-order-action";
import React, { useActionState, useEffect } from "react";
import { useStore } from "@/src/store";
import { toast } from "react-toastify";

export default function SubmitFormOrder() {
  const total = useStore((state) => state.total);
  const cupon = useStore((state) => state.cupon.name);
  const clearOrder = useStore((state) => state.clearOrder);
  const contents = useStore((state) => state.contents);
  const order = {
    total,
    cupon,
    contents,
  };
  const submitOrderWithData = submitOrder.bind(null, order);

  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      clearOrder();
    }
    if (state.errors) {
      toast.error(state.errors);
    }
  }, [state, clearOrder]);

  return (
    <>
      <form action={dispatch}>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer uppercase font-bold p-3"
          value="Confirm Order"
        />
      </form>
    </>
  );
}
