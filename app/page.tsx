import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Hello World</h1>
      Click <Link href="/documents/123">here</Link>
    </div>
  );
}
