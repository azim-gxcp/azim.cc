import { config } from "../config.js";

const { owner, repo, branch, token } = config.github;
const BASE = `https://api.github.com/repos/${owner}/${repo}/contents`;

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export async function createFile(
  path: string,
  content: string,
  message: string
): Promise<void> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub createFile failed (${res.status}): ${(body as { message?: string }).message || res.statusText}`
    );
  }
}

export async function getFileContent(
  path: string
): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${BASE}/${path}?ref=${branch}`, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    throw new Error(`GitHub getFileContent failed (${res.status})`);
  }

  const data = (await res.json()) as {
    content: string;
    sha: string;
    encoding: string;
  };

  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { content: decoded, sha: data.sha };
}

export async function updateFile(
  path: string,
  content: string,
  sha: string,
  message: string
): Promise<void> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub updateFile failed (${res.status}): ${(body as { message?: string }).message || res.statusText}`
    );
  }
}

export async function fileExists(path: string): Promise<boolean> {
  const res = await fetch(`${BASE}/${path}?ref=${branch}`, {
    method: "GET",
    headers,
  });
  return res.ok;
}

export function appendToLlmsTxt(
  currentContent: string,
  title: string,
  slug: string,
  lede: string
): string {
  const newEntry = `- [${title}](https://azim.cc/blog/${slug}): ${lede}`;
  const marker = "## Published Articles";
  const markerIndex = currentContent.indexOf(marker);

  if (markerIndex === -1) {
    return currentContent + `\n\n${marker}\n\n${newEntry}\n`;
  }

  // Find the end of the articles section (next ## heading or end of file)
  const afterMarker = currentContent.substring(
    markerIndex + marker.length
  );
  const nextHeading = afterMarker.indexOf("\n## ");

  if (nextHeading === -1) {
    // No more headings, append at end
    return currentContent.trimEnd() + `\n${newEntry}\n`;
  }

  // Insert before the next heading
  const insertPos = markerIndex + marker.length + nextHeading;
  return (
    currentContent.substring(0, insertPos).trimEnd() +
    `\n${newEntry}` +
    currentContent.substring(insertPos)
  );
}
