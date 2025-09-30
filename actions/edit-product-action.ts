"use server";

import { ErrorResponseSchema, Product, ProductFormSchema } from "@/src/schemas";

type StateActionType = {
  success: string;
  errors: string[];
};

export async function editProduct(
  productId: Product["id"],
  prevState: StateActionType,
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
    return {
      success: "",
      errors: product.error.issues.map((err) => err.message),
    };
  }

  const url = `${process.env.API_URL}/products/${productId}`;
  const req = await fetch(url, {
    method: "PATCH",
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

  const json = await req.json();

  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(json);
    return {
      errors: errors.message.map((err) => err),
      success: "",
    };
  }

  return {
    success: "Product updated successfully!",
    errors: [],
  };
}
