import { getFeaturedProjects } from "@/lib/api";
import { useEffect, useState } from "react";

export function useFeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFeaturedProjects();
        setProjects(data || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { projects, loading, error };
}
