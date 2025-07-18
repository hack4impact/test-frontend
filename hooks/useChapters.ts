import { getChapters } from "@/lib/api";
import { useEffect, useState } from "react";

export function useChapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChapters();
        setChapters(data || []);
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
