"use client";

import { useMemo, useState } from "react";
import { Cat, CatsAPI, extractErrorMessage } from "@/lib/api";
import Alert from "./Alert";

type Props = {
  items: Cat[];
  onChanged: () => Promise<void> | void;
};

const money = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

export default function CatsTable({ items, onChanged }: Props) {
  const [busyId, setBusyId] = useState<number | null>(null);
  const [banner, setBanner] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  const sorted = useMemo(() => [...items].sort((a,b) => a.id - b.id), [items]);

  const updateSalary = async (id: number, salary: number) => {
    setBusyId(id);
    setBanner(null);
    try {
      if (salary < 0) throw new Error("Salary must be ≥ 0");
      await CatsAPI.updateSalary(id, salary);
      setBanner({ kind: "success", text: "Salary updated" });
      await onChanged();
    } catch (e: any) {
      setBanner({ kind: "error", text: extractErrorMessage(e) });
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this cat?")) return;
    setBusyId(id);
    setBanner(null);
    try {
      await CatsAPI.remove(id);
      setBanner({ kind: "success", text: "Cat deleted" });
      await onChanged();
    } catch (e: any) {
      setBanner({ kind: "error", text: extractErrorMessage(e) });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-ink-200 dark:border-ink-700 space-y-2">
        <h3 className="font-semibold text-lg">Spy Cats</h3>
        {banner && <Alert kind={banner.kind}>{banner.text}</Alert>}
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Breed</Th>
              <Th>YoE</Th>
              <Th>Salary</Th>
              <Th>Current Mission</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td className="p-4 text-ink-500 dark:text-ink-400" colSpan={7}>
                  No cats yet
                </td>
              </tr>
            )}
            {sorted.map((c) => (
              <tr key={c.id} className="table-row">
                <Td>{c.id}</Td>
                <Td>{c.name}</Td>
                <Td>{c.breed}</Td>
                <Td>{c.years_experience}</Td>
                <Td>
                  <SalaryCell
                    id={c.id}
                    value={c.salary}
                    onSave={updateSalary}
                    disabled={busyId === c.id}
                  />
                </Td>
                <Td>{c.current_mission_id ?? "—"}</Td>
                <Td>
                  <button
                    onClick={() => remove(c.id)}
                    disabled={busyId === c.id}
                    className="btn-ghost"
                  >
                    Delete
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-left font-semibold">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 align-middle">{children}</td>;
}

function SalaryCell({
  id, value, onSave, disabled
}: {
  id: number; value: number; disabled: boolean;
  onSave: (id: number, salary: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState<string>(String(value));

  const save = () => {
    const n = Number(temp);
    if (Number.isNaN(n)) return alert("Enter a number");
    onSave(id, n);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <span className="tabular-nums">{money.format(value)}</span>
        <button
          disabled={disabled}
          className="text-blue-700 hover:underline dark:text-agent-500 disabled:opacity-60"
          onClick={() => { setTemp(String(value)); setEditing(true); }}
        >
          Edit
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <input
        className="input w-28"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        type="number"
        min={0}
      />
      <button className="btn-primary" onClick={save} disabled={disabled}>Save</button>
      <button className="btn-ghost" onClick={() => setEditing(false)} disabled={disabled}>Cancel</button>
    </div>
  );
}
