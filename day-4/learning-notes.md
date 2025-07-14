# Learning Notes: Next.js Day 4

## Project Structure & Routing
- Practiced the new Next.js App Router (app directory).
- Created multiple routes: `/admin`, `/dashboard`, `/inroot`, and dynamic routes using `[...dynamicroot]`.
- Nested routes and layouts: e.g., `/admin/subadmin`, `/dashboard/subdashboard`, and `(notroot)/inroot`.
- Used `Link` from `next/link` for client-side navigation in the main layout.

## Layouts & Navigation
- Implemented a global layout in `app/layout.js` with navigation links to main sections.
- Used custom Google Fonts (`Geist`, `Geist_Mono`) via `next/font/google` and set CSS variables for font families.
- Each section (e.g., `/admin`) can have its own layout (`admin/layout.js`).

## Client Components & Navigation
- Used the `useRouter` hook from `next/navigation` in client components (e.g., `admin/page.js`) to programmatically navigate between routes (e.g., button to go from Admin to Dashboard).

## Dynamic & Nested Routing
- Practiced dynamic routing with `[...dynamicroot]/page.js` to handle catch-all routes and display dynamic params.
- Explored nested routing with folders like `subadmin`, `subdashboard`, and `(notroot)/inroot`.

## Error & Loading States
- Implemented custom error handling with `app/error.js`.
- Added a loading state for the admin section with `admin/loading.js`.

## Styling
- Used Tailwind CSS for utility-first styling (see `globals.css`).
- Defined global CSS variables for background, foreground, and fonts.
- Supported dark mode with media queries in `globals.css`.

## Key Takeaways
- Next.js App Router enables powerful file-based routing, layouts, and nested routes.
- Dynamic and catch-all routes are easy to implement.
- Error and loading UI can be handled at the route level.
- Integration with Tailwind CSS and custom fonts is straightforward.

---
_This file summarizes the main concepts and practices learned in the day-4 Next.js project._ 