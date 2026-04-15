import { getWikiPage } from "@/lib/wiki";
import { generateWikiUpdate } from "@/lib/wiki-updates";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || "");
    const page = getWikiPage(slug);

    if (!page) {
      return Response.json({ error: "Unknown wiki slug." }, { status: 404 });
    }

    const update = await generateWikiUpdate(slug);
    return Response.json({ ok: true, update });
  } catch (error: any) {
    return Response.json({ error: error.message || "Failed to update wiki node." }, { status: 500 });
  }
}
