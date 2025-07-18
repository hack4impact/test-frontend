import { getNationalInitiatives } from "@/lib/api";
import { useEffect, useState } from "react";

export function useNationalInitiatives() {
  const [nationalInitiatives, setNationalInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNationalInitiatives();
        setNationalInitiatives(data || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { nationalInitiatives, loading, error };
}
