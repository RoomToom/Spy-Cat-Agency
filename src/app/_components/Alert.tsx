// src/app/_components/Alert.tsx
"use client";

export default function Alert({
  kind = "info",
  children,
}: {
  kind?: "info" | "success" | "error" | "warning";
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };
  return (
    <div className={`rounded-lg border px-3 py-2 text-sm ${styles[kind]}`}>
      {children}
    </div>
  );
}
