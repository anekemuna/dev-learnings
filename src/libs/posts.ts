import { supabase } from "./supabaseClient";

// export interface Post {
//   id: string;
//   title: string;
//   summary: string;
//   content: string;
//   created_at: string;
// }

/**
 *  Returns a list of blog posts from Supabase
 * @returns An array of post objects.
 * @throws Throws an error if fetching fails.
 */
export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }

  return (
    data?.map((post) => ({
      id: post.id,
      title: post.title ?? 'Untitled',
      summary: post.summary ?? '',
      content: post.content ?? '',
      created_at: post.created_at,
    })) ?? []
  );
}

/**
 * Fetches a single post by its ID.
 *
 * @param id - The ID of the post to fetch.
 * @returns The post object if found, or null.
 */
export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("Error fetching post:", error.message);
    return null;
  }

  return data;
}
