"use server";

export async function uploadImage(formData: FormData): Promise<string> {
  const url = `${process.env.API_URL}/products/upload-image`;
  const request = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const image = await request.json();
  return image.secure_url;
}
