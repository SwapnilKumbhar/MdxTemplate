import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

// The shape of the blog matter.
export interface FrontMatter {
  title: string
  author: string
  slug: string
}

// content is the raw blogpsot data without the metadata
export interface BlogPost {
  metadata: FrontMatter
  content: string
}

const MDX_DIR = './data/blog';

export async function getAllPosts() {
  // All blog posts
  const posts: BlogPost[] = [];

  // Find names of every file in the folder that ends with `.mdx`
  // Then get their absolute paths by joining
  const blogEntries = fs.readdirSync(MDX_DIR)
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => path.join(MDX_DIR, filename));

  const blogData = blogEntries.map((file) => fs.readFileSync(file));

  // Add each blog to the global POSTS list
  blogData.forEach((file) => {
    // Read frontmatter
    const frontmatter = matter(file);

    // Push to array
    posts.push({
      metadata: frontmatter.data as FrontMatter,
      content: frontmatter.content,
    });
  });

  return posts;
}
