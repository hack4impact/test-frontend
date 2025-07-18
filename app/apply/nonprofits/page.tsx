"use client";

import ApplySection from "@/components/features/apply/ApplySection";
import { useNonprofitApplyContent } from "@/hooks/useApplyContent";

export default function Nonprofit() {
  const { nonprofitApply, loading, error } = useNonprofitApplyContent();
  console.log(loading, error);

  if (nonprofitApply == null) return null;

  return <ApplySection applyInfo={nonprofitApply} />;
}
