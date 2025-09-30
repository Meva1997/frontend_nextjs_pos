"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionFilter() {
  // iniciar en null para que el SSR y el cliente no rendericen valores distintos
  const [date, setDate] = useState<Value>(null);

  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd", {
    locale: enUS,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });

  const total = data?.reduce((acc, sale) => acc + Number(sale.total), 0) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar value={date} onChange={setDate} locale="en-US" />
        <div className="mt-5 text-lg font-bold ">
          Total Sales:{" "}
          {total === 0 ? (
            <span className="text-red-500">{formatCurrency(0)}</span>
          ) : (
            <span className="text-green-600">{formatCurrency(total)}</span>
          )}
        </div>
      </div>

      <div>
        {data?.length ? (
          data.map((transaction) => (
            <TransactionSummary
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <p className="text-lg text-center">No sales found for this date.</p>
        )}
        {isLoading && (
          <p className="text-md mt-5 text-center animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
}
