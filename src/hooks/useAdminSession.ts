/**
 * Reusable adminSession hook for protecting admin routes
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabaseClient";
import type { Session } from "@supabase/supabase-js";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!
export function useAdminSession() {
  // session info
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    // get session using supabase
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession(); // get session
      const user = data.session?.user; // get user's session

      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace("/admin"); // reroute if not logged in
      } else if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    };

    checkSession(); // call function to check session

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (mounted) setSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return { session, loading };
}
