import { getAllPostsMeta } from "@/lib/posts";

export async function GET() {
  const posts = getAllPostsMeta();
  return Response.json(posts);
}
