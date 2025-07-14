import { useEffect, useState } from "react";

import { ContentfulService } from "./services";
import { Chapter, ExecMember, Project } from "./types";

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    ContentfulService.getFeaturedProjects()
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}

export function useChapters(activeOnly: boolean = false) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    ContentfulService.getChapters(activeOnly)
      .then(setChapters)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [activeOnly]);

  return { chapters, loading, error };
}

export function useChapterBySlug(slug: string) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    ContentfulService.getChapterBySlug(slug)
      .then(setChapter)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { chapter, loading, error };
}

export function useExecMembers() {
  const [members, setMembers] = useState<ExecMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    ContentfulService.getExecMembers()
      .then(setMembers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { members, loading, error };
}
