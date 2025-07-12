"use client";

import { useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", summary: "", content: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("posts").insert([form]);
    if (!error) {
      router.push("/admin/posts");
    } else {
      setMessage(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 shadow rounded"
    >
      <h2 className="text-xl font-semibold">Create Post</h2>
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Summary"
        value={form.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={form.content}
        onChange={(e) => handleChange("content", e.target.value)}
        required
        rows={6}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
