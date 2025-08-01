import { getExecMembers } from "@/lib/api";
import { ExecMember } from "@/types/contentful";
import { useEffect, useState } from "react";

export function useExecMembers() {
  const [execMembers, setExecMembers] = useState<ExecMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExecMembers();
        setExecMembers(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { execMembers, loading, error };
}
