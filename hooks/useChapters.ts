import { getChapters } from "@/lib/api";
import { Chapter } from "@/types/contentful";
import { useEffect, useState } from "react";

export function useChapters() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChapters();
        setChapters(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { chapters, loading, error };
}
