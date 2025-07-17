export async function GET() {
  const data = [
    { id: 1, name: "Mohan" },
    { id: 2, name: "Kavya" },

  ];
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// This function handles GET requests to the API route.
// It is an async function named GET, which is a convention in Next.js API routes (app directory).
// The function receives a 'request' object (not used here).
// It returns a new Response object with a JSON string as the body.
// The JSON contains a message: "Hello from Next.js API!".
// The response has a status code of 200 (OK) and sets the Content-Type header to "application/json".


