import { useStore } from "@/src/store";

export default function CuponForm() {
  const applyCupon = useStore((state) => state.applyCupon);
  const cupon = useStore((state) => state.cupon);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const cuponName = formData.get("coupon_name");
    if (!cuponName) return;
    console.log("Coupon applied:", cuponName);
    await applyCupon(cuponName as string);
  };

  return (
    <>
      <p className="py-5 font-bold border-t border-gray-300">Apply Coupon</p>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 bg-gray-200 border-gray-300 w-full"
          placeholder="Enter coupon code"
          name="coupon_name"
        />
        <input
          type="submit"
          className="p-3 bg-green-400 font-bold hover:cursor-pointer"
          value="Apply"
        />
      </form>

      {cupon.message ? (
        <p className="py-4 text-center text-sm font-bold">{cupon.message}</p>
      ) : null}
    </>
  );
}
