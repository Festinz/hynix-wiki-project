import { getWikiPage } from "@/lib/wiki";
import { listWikiUpdates } from "@/lib/wiki-updates";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const page = getWikiPage(params.slug);
  if (!page) {
    return Response.json({ error: "Unknown wiki slug." }, { status: 404 });
  }

  const updates = await listWikiUpdates(params.slug);
  return Response.json({ ok: true, slug: params.slug, updates });
}
