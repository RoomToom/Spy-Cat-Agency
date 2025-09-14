"use client";

import { useState } from "react";
import { CatsAPI, CreateCatDTO, extractErrorMessage } from "@/lib/api";
import Alert from "./Alert";

type Props = { onCreated: () => Promise<void> | void };

export default function CatForm({ onCreated }: Props) {
  const [form, setForm] = useState<CreateCatDTO>({
    name: "",
    years_experience: 0,
    breed: "",
    salary: 0,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({
      ...s,
      [name]:
        name === "years_experience" || name === "salary"
          ? Number(value)
          : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setOk(null);
    try {
      if (!form.name.trim()) throw new Error("Name is required");
      if (!form.breed.trim())
        throw new Error("Breed is required (e.g., Abyssinian)");
      if (form.years_experience < 0)
        throw new Error("Years of experience must be ≥ 0");
      if (form.salary < 0) throw new Error("Salary must be ≥ 0");

      await CatsAPI.create(form);
      setOk("Cat created successfully");
      setForm({ name: "", years_experience: 0, breed: "", salary: 0 });
      await onCreated();
    } catch (e: any) {
      setErr(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card p-5 space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="font-semibold text-xl">Add new spy cat</h3>
      </div>

      {ok && <Alert kind="success">{ok}</Alert>}
      {err && <Alert kind="error">{err}</Alert>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input className="input" name="name" placeholder="Name" value={form.name} onChange={onChange} />
        <input className="input" name="breed" placeholder="Breed (e.g., Abyssinian)" value={form.breed} onChange={onChange} />
        <input className="input" name="years_experience" type="number" min={0} placeholder="Years of Experience" value={form.years_experience} onChange={onChange} />
        <input className="input" name="salary" type="number" min={0} placeholder="Salary" value={form.salary} onChange={onChange} />
      </div>

      <button disabled={loading} className="btn-primary">
        {loading ? "Saving..." : "Create"}
      </button>
    </form>
  );
}
