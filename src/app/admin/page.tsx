"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchPosts();
  }, [session]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setMessage(`Error loading posts: ${error.message}`);
    } else {
      setPosts(data);
    }
  };

  const handleInput = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (editingPost) {
      const { error } = await supabase
        .from("posts")
        .update(form)
        .eq("id", editingPost.id);
      if (error) setMessage(`Update failed: ${error.message}`);
      else {
        setMessage("✅ Post updated");
        setEditingPost(null);
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from("posts").insert([form]);
      if (error) setMessage(`Create failed: ${error.message}`);
      else {
        setMessage("✅ Post created");
        fetchPosts();
      }
    }

    setForm({ title: "", summary: "", content: "" });
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      summary: post.summary,
      content: post.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) setMessage(`Delete failed: ${error.message}`);
    else {
      setMessage("🗑️ Post deleted");
      fetchPosts();
    }
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!session) {
    return (
      <main className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn} className="w-full bg-blue-600 text-white py-2 rounded">
          Log In
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={signOut}
          className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300"
        >
          Sign Out
        </button>
      </div>

      <form onSubmit={handleCreateOrUpdate} className="bg-white p-4 shadow rounded mb-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {editingPost ? "Edit Post" : "Create Post"}
        </h2>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleInput("title", e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => handleInput("summary", e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          value={form.content}
          onChange={(e) => handleInput("content", e.target.value)}
          rows={5}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingPost ? "Update Post" : "Create Post"}
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">All Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-medium">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{post.summary}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
