"use client";

import ApplySection from "@/components/features/apply/ApplySection";
import { applyNonprofits } from "@/data/content";
import { useNonprofitApplyContent } from "@/hooks/useApplyContent";
import { Application } from "@/types/contentful";
import { motion } from "motion/react";
import Link from "next/link";

export default function Work() {
  const { nonprofitApply, loading, error } = useNonprofitApplyContent();
  const nonprofitInfo: Application | null = nonprofitApply;

  if (nonprofitInfo == null) return;

  return <ApplySection applyInfo={nonprofitInfo} />;
}
