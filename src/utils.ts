export function formatCurrency(
  amount: number,
  locale = "en-US",
  currency = "USD"
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}

export function isValidPage(value: number) {
  if (value == null) {
    return false;
  }

  if (typeof value !== "number" && isNaN(value)) {
    return false;
  }
  if (value <= 0) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  return true;
}

export function getImagePath(image: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (image.startsWith(cloudinaryBaseUrl)) {
    return image;
  } else {
    if (process.env.API_URL) {
      return `${process.env.API_URL}/img/${image}`;
    } else {
      return `${process.env.NEXT_PUBLIC_DOMAIN}/img/${image}`;
    }
  }
}

export function isAvailable(stock: number) {
  return stock > 0;
}
