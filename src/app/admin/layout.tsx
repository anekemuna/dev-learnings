export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin</h1>
        <a href="/admin/posts" className="text-blue-600 underline">
          Posts
        </a>
      </header>
      {children}
    </div>
  );
}
