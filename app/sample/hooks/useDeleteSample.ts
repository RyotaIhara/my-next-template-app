import { useState } from "react";

export function useDeleteSample(onSuccess?: () => void) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("本当に削除しますか？")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/sample/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "削除に失敗しました");
        return;
      }

      onSuccess?.();
    } catch (e) {
      console.error(e);
      alert("通信エラーが発生しました");
    } finally {
      setDeletingId(null);
    }
  };

  return { handleDelete, deletingId };
}

