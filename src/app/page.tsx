import CatForm from "./_components/CatForm";
import CatsTable from "./_components/CatsTable";

async function getCats() {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";
  try {
    const res = await fetch(`${base}/api/v1/cats`, {
      cache: "no-store",
      headers: { "Accept": "application/json" },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Page() {
  const initialCats = await getCats();

  // простий спосіб “рефрешу” після змін — перезавантаження сторінки
  const refresh = `window.location.reload();`;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Spy Cats Dashboard</h1>

      <CatForm onCreated={() => { eval(refresh); }} />

      <CatsTable items={initialCats} onChanged={() => { eval(refresh); }} />

      <p className="text-xs text-gray-500">
        API: <code>{process.env.NEXT_PUBLIC_API_URL}</code>
      </p>
    </main>
  );
}
