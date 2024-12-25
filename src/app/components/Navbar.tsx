import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Todo App</h1>
        <div>
          <Link href="/dashboard" className="mr-4">
            Dashboard
          </Link>
          <Link href="/auth/signin">Sign In</Link>
        </div>
      </div>
    </nav>
  );
}
