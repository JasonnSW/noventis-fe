import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl py-24 text-center">
      <h1 className="mb-3 text-3xl font-bold">Page not found</h1>
      <p className="mb-6 text-muted-foreground">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className="rounded-md border px-4 py-2">
        Back to Home
      </Link>
    </main>
  );
}
