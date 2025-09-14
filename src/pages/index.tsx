"use client";

import { useEffect, useState } from "react";
import { Cat, CatsAPI } from "@/lib/api";
import CatForm from "@/app/_components/CatForm";
import CatsTable from "@/app/_components/CatsTable";

export default function IndexPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await CatsAPI.list();
      setCats(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Spy Cats Dashboard</h1>

      <CatForm onCreated={load} />

      {loading ? (
        <div className="card p-6 text-ink-500 dark:text-ink-400">Loading…</div>
      ) : (
        <CatsTable items={cats} onChanged={load} />
      )}
    </div>
  );
}
