# Day 5: Learning Notes - Static Site Generation (SSG) in Next.js

## What is SSG?
Static Site Generation (SSG) is a pre-rendering method in Next.js where HTML pages are generated at build time. This means the content is generated once during the build and then served as static files, resulting in fast load times and improved performance.

## How SSG Works in Next.js
- **Build Time Rendering:** Pages are generated as static HTML during the build process using data available at that time.
- **No Server-Side Rendering on Request:** Unlike SSR, SSG does not generate pages on each request. Instead, the same static file is served to every user.
- **getStaticProps:** Next.js provides the `getStaticProps` function to fetch data at build time for a page.
- **getStaticPaths:** For dynamic routes, `getStaticPaths` is used alongside `getStaticProps` to specify which paths should be statically generated.

## Example Practice
```js
// pages/blog/[id].js
export async function getStaticProps(context) {
  const { id } = context.params;
  // Fetch data for the blog post with the given id
  const post = await fetchPostById(id);
  return { props: { post } };
}

export async function getStaticPaths() {
  // Fetch all blog post ids
  const posts = await fetchAllPosts();
  const paths = posts.map(post => ({ params: { id: post.id.toString() } }));
  return { paths, fallback: false };
}

export default function BlogPost({ post }) {
  return <div>{post.title}</div>;
}
```

## Benefits of SSG
- Super fast page loads (static files)
- SEO friendly
- Reduced server load

## When to Use SSG
- Content that does not change often (blogs, documentation, marketing pages)

---
*This file summarizes the key concepts and practice related to SSG in Next.js learned on Day 5.* 