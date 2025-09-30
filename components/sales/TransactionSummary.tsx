import { Transaction } from "@/src/schemas";
import { formatCurrency, getImagePath } from "@/src/utils";
import { format } from "date-fns";
import Image from "next/image";

export default function TransactionSummary({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <>
      <div className="mb-6  text-sm font-medium text-gray-500 border border-gray-200">
        <p className="text-sm font-black text-gray-900 p-2 bg-gray-200 ">
          ID: {transaction.id} - Date:{" "}
          {format(new Date(transaction.transactionDate), "yyyy-MM-dd")}
        </p>
        <ul
          role="list"
          className="divide-y divide-gray-200 border-t border-gray-200 border-b"
        >
          {transaction.contents.map((item) => (
            <li className="p-5 " key={item.id}>
              <div className="flex items-center space-x-6 ">
                <div className="relative w-32 h-32">
                  <Image
                    src={getImagePath(item.product.image)}
                    alt={item.product.name}
                    fill
                    className="object-contain"
                  ></Image>
                </div>
                <div className="flex-auto space-y-1 ">
                  <h3 className="text-gray-900">{item.product.name}</h3>
                  <p className="text-lg font-extrabold  text-gray-900">
                    Price: {formatCurrency(+item.price)}
                  </p>
                  <p className="text-lg  text-gray-900">
                    Quantity: {item.quantity}{" "}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="space-y-6  text-sm font-medium text-gray-500 p-5">
          <div className="flex justify-between">
            <dt>Applied Coupon</dt>
            <dd className="text-gray-900">
              {transaction.cupon || "No coupon applied"}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd className="text-gray-900">
              -{" "}
              {formatCurrency(transaction.discount ? +transaction.discount : 0)}
            </dd>
          </div>

          <div className="flex justify-between">
            <dt className="text-lg text-black font-black">Total</dt>
            <dd className="text-lg text-black font-black">
              {formatCurrency(+transaction.total)}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
