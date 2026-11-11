# TabNews

A minimal Next.js application using TypeScript and the [App Router](https://nextjs.org/docs/app/getting-started/installation). The home page displays **Hello TabNews**.

Requires Node.js 20.9 or newer and Bun.

Install dependencies and start the development server:

```sh
bun install --no-save
rm -f bun.lock
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx` to change the page, `app/layout.tsx` for the shared layout and metadata, and `app/globals.css` for styles.

Check types:

```sh
bun run typecheck
```

This generates Next.js route types and runs TypeScript in strict mode. Next.js manages `next-env.d.ts`; it and the TypeScript build cache are ignored by Git.

Build and run for production:

```sh
bun run build
bun run start
```
