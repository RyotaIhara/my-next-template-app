import { useState } from "react";
import { useRouter } from "next/navigation";

export function useUpdateSample(id: string) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (name: string, memo: string) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/sample/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, memo }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "サンプルの更新に失敗しました");
        return;
      }

      // 成功したら一覧画面へ遷移
      router.push("/sample");
    } catch (e) {
      console.error(e);
      setError("通信エラーが発生しました");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/sample");
  };

  return { handleSubmit, handleCancel, loading, error };
}

