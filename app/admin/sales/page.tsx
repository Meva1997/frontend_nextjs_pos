import TransactionFilter from "@/components/sales/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export default async function salesPage() {
  const queryClient = new QueryClient();
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd", {
    locale: enUS,
  });
  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });
  return (
    <>
      <Heading>Sales</Heading>
      <p className="text-lg">
        In this section you will manage your sales, use de calendar to select
        the date{" "}
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  );
}
