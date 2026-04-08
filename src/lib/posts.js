import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
const BLOG_ROOT = path.join(process.cwd(), 'data', 'blog');
const SUPPORTED_LOCALES = ['tr', 'en'];

function sortByDateDesc(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function getLocalePostFiles(locale) {
  const localeDir = path.join(BLOG_ROOT, locale);
  return fs.readdirSync(localeDir).filter((fileName) => fileName.endsWith('.md'));
}

function parsePostFile(locale, fileName) {
  const filePath = path.join(BLOG_ROOT, locale, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    data,
    content,
    filePath,
  };
}

export function getAllPosts() {
  const postMap = new Map();

  for (const locale of SUPPORTED_LOCALES) {
    const files = getLocalePostFiles(locale);

    for (const fileName of files) {
      const { data, filePath } = parsePostFile(locale, fileName);
      const key = String(data.postId);
      const existing = postMap.get(key) || {
        id: Number(data.postId),
        slug: {},
        title: {},
        excerpt: {},
        seoDescription: {},
        keywords: {},
        contentPath: {},
      };

      existing.slug[locale] = data.slug;
      existing.title[locale] = data.title;
      existing.excerpt[locale] = data.excerpt;
      existing.seoDescription[locale] = data.seoDescription;
      existing.keywords[locale] = data.keywords || [];
      existing.contentPath[locale] = filePath;
      existing.date = data.date;
      existing.image = data.image;

      postMap.set(key, existing);
    }
  }

  return Array.from(postMap.values()).sort(sortByDateDesc);
}

export async function getPostByLocalizedSlug(slug, locale) {
  const post = getAllPosts().find((item) => item.slug[locale] === slug);

  if (!post) {
    return null;
  }

  const fileContents = fs.readFileSync(post.contentPath[locale], 'utf8');
  const { content } = matter(fileContents);
  const processedContent = await remark().use(gfm).use(html).process(content);

  return {
    ...post,
    contentHtml: processedContent.toString(),
  };
}