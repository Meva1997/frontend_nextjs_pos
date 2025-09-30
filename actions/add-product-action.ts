"use server";

import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function addProduct(
  prevState: ActionStateType,
  formData: FormData
) {
  const product = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
  });

  if (!product.success) {
    const errors = product.error.issues.map((err) => err.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/products`;
  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: product.data.name,
      price: product.data.price,
      image: product.data.image,
      stock: product.data.stock,
      categoryId: product.data.categoryId,
    }),
  });

  const json = await request.json();

  if (!request.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((err) => err),
      success: "",
    };
  }

  return {
    errors: [],
    success: "Product added successfully",
  };
}
