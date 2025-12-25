import { fetchRepoWiseTech } from "@/app/lib/githubTechStack";

export async function POST(req, { params }) {
  try {
    const { username } = await req.json();
    const { repo } = await params;

    if (!username || !repo) {
      return Response.json({ success: false, tech: [] }, { status: 400 });
    }

    const repoData = await fetchRepoWiseTech(username, repo);

    return Response.json({
      success: true,
      tech: repoData?.languages || [],
    });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, tech: [] });
  }
}
