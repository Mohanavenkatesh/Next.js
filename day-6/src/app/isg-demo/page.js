// Beginner-friendly ISG/ISR demo with API data in Next.js App Router
// This page demonstrates how to use Incremental Static Regeneration (ISR/ISG)
// with real API data in the Next.js App Router.

// Enable ISR/ISG: re-generate the page every 10 seconds
export const revalidate = 10; // After 10 seconds, the next user request will trigger a background regeneration

// The main page component. It must be async to fetch data from the API.
export default async function ISGDemoPage() {
  // Fetch data from the API endpoint. The 'next: { revalidate: 10 }' option
  // tells Next.js to use ISR for this fetch, matching the page's revalidate setting.
  // API: https://api.vercel.app/blog/4 returns a blog post as JSON.
  const res = await fetch('https://api.vercel.app/blog/4', {
    // The 'next: { revalidate: 10 }' option tells Next.js to revalidate (regenerate) the cached API response every 10 seconds,
    // enabling Incremental Static Regeneration (ISR) for this fetch request.
    next: { revalidate: 10 }
  });

  // Parse the JSON response from the API so we can use it in our component.
  const blog = await res.json();

  // Render the blog post using the data from the API.
  // Each field (title, author, date, category, content) comes from the API response.
  // The last paragraph explains ISR to the user.
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>ISG/ISR Demo: Blog Post</h1>
      <p>
        <b>Title:</b> {blog.title}
      </p>
      <p>
        <b>Author:</b> {blog.author}
      </p>
      <p>
        <b>Date:</b> {blog.date}
      </p>
      <p>
        <b>Category:</b> {blog.category}
      </p>
      <hr />
      <div>
        <b>Content:</b>
        <p>{blog.content}</p>
      </div>
      <p style={{ color: 'gray', fontSize: 14 }}>
        (This page uses Incremental Static Regeneration. Refresh after 10 seconds to see new data if the API changes.)
      </p>
    </div>
  );
}

// -----------------------------
// Quick Reference: What Each Command Does
// -----------------------------
// 1. export const revalidate = 10;
//    Enables Incremental Static Regeneration (ISR) for this page, revalidating every 10 seconds.
//
// 2. export default async function ISGDemoPage() { ... }
//    The main page component, written as an async function to allow data fetching.
//
// 3. const res = await fetch('https://api.vercel.app/blog/4', { next: { revalidate: 10 } });
//    Fetches blog data from the API and enables ISR for the fetch.
//
// 4. const blog = await res.json();
//    Parses the API response as JSON so you can use the data in your component.
//
// 5. return ( ... )
//    Renders the blog post using the fetched data, displaying title, author, date, category, and content.
//
// 6. <p style={{ color: 'gray', fontSize: 14 }}> ... </p>
//    Informs users that the page uses ISR and will update if the API changes after 10 seconds. 