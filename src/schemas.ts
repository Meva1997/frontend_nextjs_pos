import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  stock: z.number(),
  categoryId: z.number(),
});

export const productsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const categoriesResponseSchema = z.array(CategorySchema);

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
});

//? Shopping Cart
const ShoppingCartContentsSchema = ProductSchema.pick({
  name: true,
  image: true,
  price: true,
  stock: true,
}).extend({
  productId: z.number(),
  quantity: z.number().min(1),
});
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema);

export const CuponResponseSchema = z.object({
  name: z.string().default(""), // Default to empty string because a coupon may be applied or not
  message: z.string(),
  percentage: z.coerce.number().min(0).max(100).default(0),
});

const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});
export const OrderSchema = z.object({
  total: z.number(),
  cupon: z.string(),
  contents: z
    .array(OrderContentSchema)
    .min(1, { message: "El Carrito no puede ir vacio" }),
});

export const ContentsSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.coerce.number(),
  product: ProductSchema,
});
export const TransactionResponseSchema = z.object({
  id: z.number(),
  total: z.string(),
  transactionDate: z.string(),
  discount: z.string().nullable(),
  cupon: z.string().nullable(),
  contents: z.array(ContentsSchema),
});

export const TransactionsResponseSchema = z.array(TransactionResponseSchema);

export const ProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  price: z.coerce
    .number({ message: "Product price is required" })
    .min(1, { message: "Product price must be greater than 0" }),
  image: z.string({ message: "Product image is required" }),
  stock: z.coerce
    .number({ message: "Invalid stock" })
    .min(1, { message: "Stock must be greater than 0" }),
  categoryId: z.coerce.number({ message: "Invalid category" }),
});

//!success and error types
/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  message: z.string(),
});
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>;
export type Cupon = z.infer<typeof CuponResponseSchema>;
export type Transaction = z.infer<typeof TransactionResponseSchema>;
