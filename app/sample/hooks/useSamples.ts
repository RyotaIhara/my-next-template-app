import { useState, useEffect } from "react";

interface Sample {
  id: number;
  name: string;
  memo: string;
  createdAt: Date;
}

export function useSamples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSamples = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/sample");

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "サンプルの取得に失敗しました");
        return;
      }

      const data = await res.json();
      setSamples(data);
    } catch (e) {
      console.error(e);
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  return { samples, loading, error, fetchSamples };
}

