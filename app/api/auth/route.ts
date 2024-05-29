export async function GET(request: Request) {
  console.log("MIIDDLEWARE");

  return new Response("Authentication Required!", {
    status: 401,
    headers: {
      "WWW-Authenticate": "Basic realm='private_pages'",
      Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
    },
  });
}
