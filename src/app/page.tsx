'use client';
import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

type Cat = {
  id: number;
  name: string;
  years_experience: number;
  breed: string;
  salary: number;
  current_mission_id?: number | null;
};

export default function Page() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ name: '', years_experience: 0, breed: '', salary: 0 });

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api<Cat[]>('/api/v1/cats');
      setCats(data);
    } catch (e:any) {
      setError(e.message || 'Failed to load cats');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createCat(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api<Cat>('/api/v1/cats', { method: 'POST', body: JSON.stringify(form) });
      setForm({ name: '', years_experience: 0, breed: '', salary: 0 });
      await load();
      alert('Cat created');
    } catch (e:any) {
      alert(e.message || 'Create failed');
    }
  }

  async function updateSalary(id: number, salary: number) {
    try {
      await api<Cat>(`/api/v1/cats/${id}`, { method: 'PATCH', body: JSON.stringify({ salary }) });
      await load();
    } catch (e:any) {
      alert(e.message || 'Update failed');
    }
  }

  async function remove(id: number) {
    if (!confirm('Delete this cat?')) return;
    try {
      await api(`/api/v1/cats/${id}`, { method: 'DELETE' });
      await load();
    } catch (e:any) {
      alert(e.message || 'Delete failed');
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: 16 }}>
      <h1>Spy Cats Dashboard</h1>

      <section>
        <h2>Add Cat</h2>
        <form onSubmit={createCat} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input placeholder="Years of Experience" type="number" value={form.years_experience} onChange={e=>setForm({...form, years_experience: Number(e.target.value)})} min={0} />
          <input placeholder="Breed" value={form.breed} onChange={e=>setForm({...form, breed: e.target.value})} required />
          <input placeholder="Salary" type="number" step="0.01" value={form.salary} onChange={e=>setForm({...form, salary: Number(e.target.value)})} min={0} />
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Cats</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && cats.length === 0 && <p>No cats yet.</p>}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>YOE</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Breed</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Salary</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map(c => (
              <tr key={c.id}>
                <td style={{ borderBottom: '1px solid #eee' }}>{c.name}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{c.years_experience}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>{c.breed}</td>
                <td style={{ borderBottom: '1px solid #eee' }}>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={c.salary}
                    onBlur={(e)=>updateSalary(c.id, Number(e.target.value))}
                    style={{ width: 120 }}
                  />
                </td>
                <td style={{ borderBottom: '1px solid #eee' }}>
                  <button onClick={()=>remove(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
