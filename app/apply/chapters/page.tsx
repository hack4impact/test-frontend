"use client";

import ApplySection from "@/components/features/apply/ApplySection";
import { applyChapters } from "@/data/content";
import { useChapterApplyContent } from "@/hooks/useApplyContent";
import { Application } from "@/types/contentful";

export default function Chapter() {
  const { chapterApply, loading, error } = useChapterApplyContent();
  const chapterInfo: Application | null = chapterApply;
  if (chapterInfo == null) return;
  return <ApplySection applyInfo={chapterInfo} />;
}
