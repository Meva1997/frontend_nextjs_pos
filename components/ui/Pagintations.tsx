import Link from "next/link";
import React from "react";

type PaginationsProps = {
  page: number;
  totalPages: number;
  baseUrl: string;
};

export default function Pagintations({
  page,
  totalPages,
  baseUrl,
}: PaginationsProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      <nav className="flex justify-center py-10 ">
        {page > 1 && (
          <Link
            className="px-3 py-2 ml-0 leading-tight border bg-white border-gray-300 text-gray-500  hover:bg-gray-100 hover:text-gray-700"
            href={`${baseUrl}?page=${page - 1}`}
          >
            &laquo;
          </Link>
        )}

        {pages.map((p) => (
          <Link
            href={`/admin/products?page=${p}`}
            key={p}
            className={`px-3 py-2 ml-0 leading-tight border   ${
              p === page
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-white border-gray-300 text-gray-500  hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {p}
          </Link>
        ))}

        {page < totalPages && (
          <Link
            className="px-3 py-2 ml-0 leading-tight border bg-white border-gray-300 text-gray-500  hover:bg-gray-100 hover:text-gray-700"
            href={`${baseUrl}?page=${page + 1}`}
          >
            &raquo;
          </Link>
        )}
      </nav>
    </>
  );
}
