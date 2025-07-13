# Day 1 - Next.js Learning Notes

## What I Learned Today

### Next.js Basics
- Next.js is a React framework that provides additional features like server-side rendering, static site generation, and routing
- It offers a file-based routing system where folders and files in the `app` directory automatically become routes
- Next.js provides built-in optimizations for performance and developer experience

### Folder Structure
- **`app/`** - This is the main directory for your application code
  - `layout.js` - Root layout that wraps all pages
  - `page.js` - The main page component (homepage)
  - `globals.css` - Global styles for the entire application
  - `favicon.ico` - Website icon
- **`public/`** - Static assets like images, icons, and other files
- **`node_modules/`** - Dependencies installed by npm
- **Configuration files:**
  - `package.json` - Project dependencies and scripts
  - `next.config.mjs` - Next.js configuration
  - `jsconfig.json` - JavaScript configuration for better IDE support
  - `postcss.config.mjs` - PostCSS configuration for CSS processing

### Fonts in Next.js
- Next.js has built-in font optimization through the `next/font` module
- Fonts can be loaded locally or from Google Fonts
- The `font.js` file in the app directory is used to configure and load fonts
- Fonts are automatically optimized for performance with features like:
  - Self-hosting for better performance
  - Automatic font display optimization
  - Zero layout shift with proper font loading

### Key Takeaways
- Next.js provides a structured approach to building React applications
- The folder structure is intuitive and follows conventions
- Font optimization is handled automatically, improving user experience
- The framework prioritizes performance and developer experience

---

*Project: Next.js Learning Journey* 