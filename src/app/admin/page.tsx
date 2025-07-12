'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabaseClient';
import type { Session } from '@supabase/supabase-js';

export default function AdminHome() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/admin/posts');
    }
  }, [session, router]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
      <LoginForm onSuccess={() => router.push('/admin/posts')} />
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
      >
        Login
      </button>
      {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
    </form>
  );
}
