import { useState, useEffect } from "react";

interface Sample {
  id: number;
  name: string;
  memo: string;
  createdAt: Date;
}

export function useSampleById(id: string | undefined) {
  const [sample, setSample] = useState<Sample | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSample = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/sample/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError("サンプルが見つかりません");
          } else {
            setError("データの取得に失敗しました");
          }
          return;
        }

        const data = await res.json();
        setSample(data);
      } catch (e) {
        console.error(e);
        setError("通信エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [id]);

  return { sample, loading, error };
}

