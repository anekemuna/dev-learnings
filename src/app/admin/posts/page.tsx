/**
 * Admin page to manage all blog posts.
 * Displays a list of posts with options to edit or delete,
 * and includes a logout button and a link to create a new post.
 */

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPosts() {
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]); // fetched posts
  const [message, setMessage] = useState(""); // success/ error message

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Fetches all posts from Supabase and updates state.
   */
  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  /**
   * Deletes a post from the database after user confirmation.
   *
   * @param id - ID of the post to delete
   */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) {
      setMessage("Deleted");
      fetchPosts();
    }
  };

  /**
   * Logs the user out and redirects to the admin login page.
   */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin"); // Back to login
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Posts</h2>
          <p className="text-sm text-gray-500">Manage your blog posts below</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Create
          </Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Display success message */}
      {message && (
        <p className="text-green-600 mb-4 font-medium bg-green-50 border border-green-200 p-2 rounded">
          {message}
        </p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-sm border rounded">
            <h3 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{post.summary}</p>
            <div className="flex gap-3">
              {/* Edit Button */}
              <Link
                href={`/admin/edit/${post.id}`}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
              >
                Edit
              </Link>
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
