export default async (request) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "World";
  return new Response(`Hello ${name} from Netlify Edge!`, {
    headers: { "content-type": "text/plain" },
  });
};

export const config = { path: "/edge-greeting" };
