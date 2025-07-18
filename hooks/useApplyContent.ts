import { getChapterApply, getNonprofitApply } from "@/lib/api";
import { Application } from "@/types/contentful";
import { useEffect, useState } from "react";

export function useChapterApplyContent() {
  const [chapterApply, setChapterApply] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: { props: { content: Application } } =
          await getChapterApply();
        setChapterApply(data.props.content);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { chapterApply, loading, error };
}

export function useNonprofitApplyContent() {
  const [nonprofitApply, setNonprofitApply] = useState<Application | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: { props: { content: Application } } =
          await getNonprofitApply();
        setNonprofitApply(data.props.content);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { nonprofitApply, loading, error };
}
