export async function POST(request: Request) {
  const cupon = await request.json();
  const url = `${process.env.API_URL}/cupons/apply-cupon`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cupon),
  });
  const res = await req.json();
  return Response.json({ ...res, status: req.status });
}
