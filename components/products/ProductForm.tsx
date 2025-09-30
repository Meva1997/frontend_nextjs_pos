import { categoriesResponseSchema, Product } from "@/src/schemas";
import UploadProductImage from "./UploadProductImage";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const request = await fetch(url);
  const json = await request.json();
  const categories = categoriesResponseSchema.parse(json);
  return categories;
}

export default async function ProductForm({ product }: { product?: Product }) {
  const categories = await getCategories();
  return (
    <>
      <div className="space-y-2 ">
        <label htmlFor="name" className="block">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 w-full p-2"
          name="name"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2 ">
        <label htmlFor="price" className="block">
          Price
        </label>
        <input
          id="price"
          type="number"
          placeholder="Product Price"
          className="border border-gray-300 w-full p-2"
          name="price"
          min={0}
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2 ">
        <label htmlFor="stock" className="block">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          placeholder="Product Stock"
          className="border border-gray-300 w-full p-2"
          name="stock"
          min={0}
          defaultValue={product?.stock}
        />
      </div>

      <div className="space-y-2 ">
        <label htmlFor="categoryId" className="block">
          Category
        </label>
        <select
          id="categoryId"
          className="border border-gray-300 w-full p-2 bg-white"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <UploadProductImage currentimage={product?.image} />
    </>
  );
}
