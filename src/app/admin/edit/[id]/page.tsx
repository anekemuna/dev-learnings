"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", summary: "", content: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            title: data.title ?? "",
            summary: data.summary ?? "",
            content: data.content ?? "",
          });
        }
      });
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("posts").update(form).eq("id", id);
    if (!error) router.push("/admin/posts");
    else setMessage(error.message);
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="space-y-4 bg-white p-4 shadow rounded"
    >
      <h2 className="text-xl font-semibold">Edit Post</h2>
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
      <button className="bg-yellow-500 text-white px-4 py-2 rounded">
        Update
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
