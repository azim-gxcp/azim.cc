import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const DRAFTS_DIR = path.join(process.cwd(), "content/drafts");
const POSTS_DIR = path.join(process.cwd(), "content/posts");

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractTitleFromMarkdown(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function processMarkdownFile(filePath: string): void {
  const filename = path.basename(filePath, path.extname(filePath));
  const slug = slugify(filename);
  const destPath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (fs.existsSync(destPath)) {
    console.log(`  Skipping ${filename} — already exists in posts`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const stats = readingTime(content);
  const fileStat = fs.statSync(filePath);

  const hasFrontmatter = Object.keys(data).length > 0;

  let finalContent: string;

  if (hasFrontmatter) {
    // Frontmatter exists — ensure required fields, copy as-is
    const fm = {
      title: data.title || extractTitleFromMarkdown(content) || filename,
      lede: data.lede || "",
      kicker: data.kicker || "Essays",
      author: data.author || "Azim",
      date:
        data.date ||
        fileStat.mtime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      readTime: Math.ceil(stats.minutes),
      published: data.published !== false,
      ...data,
    };
    finalContent = matter.stringify(content, fm);
  } else {
    // No frontmatter — auto-generate
    const title = extractTitleFromMarkdown(content) || filename;
    const bodyContent = content.replace(/^#\s+.+\n?/, "").trim();
    const fm = {
      title,
      lede: "",
      kicker: "Essays",
      author: "Azim",
      date: fileStat.mtime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: Math.ceil(stats.minutes),
      published: true,
    };
    finalContent = matter.stringify(bodyContent, fm);
  }

  fs.writeFileSync(destPath, finalContent, "utf8");
  fs.unlinkSync(filePath);
  console.log(`  Processed ${filename}.md → ${slug}.mdx`);
}

async function processPdfFile(filePath: string): Promise<void> {
  const filename = path.basename(filePath, ".pdf");
  const slug = slugify(filename);
  const destPath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (fs.existsSync(destPath)) {
    console.log(`  Skipping ${filename}.pdf — already exists in posts`);
    return;
  }

  try {
    const pdfParseModule = await import("pdf-parse");
    const pdfParse = "default" in pdfParseModule ? (pdfParseModule as { default: typeof pdfParseModule }).default : pdfParseModule;
    const buffer = fs.readFileSync(filePath);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdf = await (pdfParse as any)(buffer);

    const text = (pdf.text as string).trim();
    const lines = text.split("\n").filter((l: string) => l.trim());

    // First non-empty line as title
    const title = lines[0] || filename;
    const bodyLines = lines.slice(1);

    // Convert to basic markdown paragraphs
    const body = bodyLines
      .map((line: string) => line.trim())
      .join("\n\n");

    const stats = readingTime(body);
    const fileStat = fs.statSync(filePath);

    const fm = {
      title,
      lede: "",
      kicker: "Essays",
      author: "Azim",
      date: fileStat.mtime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: Math.ceil(stats.minutes),
      published: true,
    };

    const finalContent = matter.stringify(body, fm);
    fs.writeFileSync(destPath, finalContent, "utf8");
    fs.unlinkSync(filePath);
    console.log(`  Processed ${filename}.pdf → ${slug}.mdx`);
  } catch (err) {
    console.error(`  Error processing ${filename}.pdf:`, err);
  }
}

async function main() {
  console.log("Processing drafts...");

  // Ensure directories exist
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(DRAFTS_DIR);

  if (files.length === 0) {
    console.log("  No drafts to process.");
    return;
  }

  for (const file of files) {
    const filePath = path.join(DRAFTS_DIR, file);
    const ext = path.extname(file).toLowerCase();

    if (ext === ".md" || ext === ".mdx") {
      processMarkdownFile(filePath);
    } else if (ext === ".pdf") {
      await processPdfFile(filePath);
    } else {
      console.log(`  Skipping ${file} — unsupported format`);
    }
  }

  console.log("Done processing drafts.");
}

main().catch(console.error);
