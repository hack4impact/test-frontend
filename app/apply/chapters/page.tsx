"use client";

import ApplySection from "@/components/features/apply/ApplySection";
import { useChapterApplyContent } from "@/hooks/useApplyContent";

export default function Chapter() {
  const { chapterApply, loading, error } = useChapterApplyContent();
  console.log(loading, error);

  if (chapterApply == null) return null;

  return <ApplySection applyInfo={chapterApply} />;
}
