/**
 * Reusable adminSession hook for protecting admin routes
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export function useAdminSession() {
  // session info
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin"); // redirect if not logged in
      } else {
        setSession(data.session);
      }
      setLoading(false);
    });
  }, [router]);

  return { session, loading };
}
