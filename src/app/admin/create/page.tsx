/**
 * Client-side page for creating a new blog post in the admin panel.
 * Allows users to input a title, summary, and content,
 * and inserts the post into the DB "posts" table.
 */

"use client";

import { useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/hooks/useAdminSession";

export default function CreatePost() {
  const { session, loading } = useAdminSession();

  // Form State
  const [form, setForm] = useState({ title: "", summary: "", content: "" });

  const [message, setMessage] = useState(""); // Error message state
  const router = useRouter();

  /**
   * Handles changes to input fields. Updates form states.
   *
   * @param field : {string} name of the field being updated
   * @param value : {string} new value of the field
   */
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Sumbits form, and insert new post in DB
   *
   * @param e : {React.FormEvent} - form submission evenet
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("posts").insert([form]);
    if (!error) {
      router.push("/admin/posts");
    } else {
      setMessage(error.message);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 shadow rounded"
    >
      <h2 className="text-xl font-semibold">Create Post</h2>
      {/* Title Input */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
      />
      {/* Summary Input */}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Summary"
        value={form.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
        required
      />
      {/* Content Input */}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={form.content}
        onChange={(e) => handleChange("content", e.target.value)}
        required
        rows={6}
      />
      {/* Submit Button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
      {/* Error Message */}
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
