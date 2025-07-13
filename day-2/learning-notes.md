# Day 2 Learning Notes - Next.js Components

## What I Learned Today

In this day, I learned about Next.js components, specifically focusing on **Server-Side Rendering (SSR)** and **Client-Side Rendering (CSR)**.

### Server-Side Rendering (SSR)
- Components that render on the server before being sent to the client
- Better for SEO and initial page load performance
- Content is available immediately when the page loads
- Good for static content and data that doesn't change frequently

### Client-Side Rendering (CSR)
- Components that render in the browser using JavaScript
- Better for interactive components and dynamic content
- Requires JavaScript to be enabled and loaded
- Good for user interactions and real-time updates

### Key Differences
| Aspect | Server-Side Rendering | Client-Side Rendering |
|--------|----------------------|----------------------|
| **Rendering Location** | Server | Browser |
| **SEO** | Excellent | Limited |
| **Initial Load** | Fast | Slower (needs JS) |
| **Interactivity** | Limited | High |
| **Use Case** | Static content, SEO-critical pages | Interactive components, dynamic content |

### Next.js Component Types
1. **Server Components** (Default in App Router)
   - Render on the server
   - No client-side JavaScript
   - Better performance and SEO

2. **Client Components**
   - Use `"use client"` directive
   - Render in the browser
   - Can use browser APIs and React hooks

### Best Practices
- Use Server Components by default
- Only use Client Components when you need:
  - Interactivity (onClick, onChange, etc.)
  - Browser APIs (localStorage, window, etc.)
  - React hooks (useState, useEffect, etc.)
  - Event listeners

### Example Usage
```jsx
// Server Component (default)
export default function ServerComponent() {
  return <div>This renders on the server</div>
}

// Client Component
"use client"
import { useState } from 'react'

export default function ClientComponent() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

This understanding of SSR vs CSR helps in building more efficient and user-friendly Next.js applications! 