import { fetchContent } from "./api";
import { QUERIES } from "./queries";
import { Application, Chapter, ExecMember, Project } from "./types";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class ContentfulCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new ContentfulCache();

export class ContentfulService {
  static async getFeaturedProjects(): Promise<Project[]> {
    const cacheKey = "featured-projects";
    const cached = cache.get<Project[]>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchContent(QUERIES.FEATURED_PROJECTS);
      const projects = data.projectCollection.items;
      cache.set(cacheKey, projects);
      return projects;
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      return [];
    }
  }

  static async getNationalInitiatives(): Promise<Project[]> {
    const cacheKey = "national-initiatives";
    const cached = cache.get<Project[]>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchContent(QUERIES.NATIONAL_INITIATIVES);
      const initiatives = data.projectCollection.items;
      cache.set(cacheKey, initiatives);
      return initiatives;
    } catch (error) {
      console.error("Error fetching national initiatives:", error);
      return [];
    }
  }

  static async getChapters(activeOnly: boolean = false): Promise<Chapter[]> {
    const cacheKey = activeOnly ? "active-chapters" : "all-chapters";
    const cached = cache.get<Chapter[]>(cacheKey);
    if (cached) return cached;

    try {
      const query = activeOnly ? QUERIES.ACTIVE_CHAPTERS : QUERIES.CHAPTERS;
      const data = await fetchContent(query);

      // Format dates as in original
      const chaptersWithFormattedDate = data.chapterCollection.items.map(
        (chapter: Chapter) => {
          const date = new Date(chapter.establishedDate);
          const year = date.getUTCFullYear();
          const semester = date.getUTCMonth() >= 6 ? "Fall" : "Spring";
          return {
            ...chapter,
            establishedDate: `${semester} ${year}`,
          };
        },
      );

      cache.set(cacheKey, chaptersWithFormattedDate);
      return chaptersWithFormattedDate;
    } catch (error) {
      console.error("Error fetching chapters:", error);
      return [];
    }
  }

  static async getChapterBySlug(slug: string): Promise<Chapter | null> {
    const cacheKey = `chapter-${slug}`;
    const cached = cache.get<Chapter>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchContent(
        QUERIES.CHAPTER_BY_SLUG.replace("$slug", `"${slug}"`),
      );
      const chapter = data.chapterCollection.items[0] || null;

      if (chapter) {
        // Format date
        const date = new Date(chapter.establishedDate);
        const year = date.getUTCFullYear();
        const semester = date.getUTCMonth() >= 6 ? "Fall" : "Spring";
        chapter.establishedDate = `${semester} ${year}`;

        cache.set(cacheKey, chapter);
      }

      return chapter;
    } catch (error) {
      console.error("Error fetching chapter by slug:", error);
      return null;
    }
  }

  static async getExecMembers(): Promise<ExecMember[]> {
    const cacheKey = "exec-members";
    const cached = cache.get<ExecMember[]>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchContent(QUERIES.EXEC_MEMBERS);
      const members = data.executiveBoardMemberCollection.items;
      cache.set(cacheKey, members);
      return members;
    } catch (error) {
      console.error("Error fetching exec members:", error);
      return [];
    }
  }

  static async getChapterApplication(): Promise<Application | null> {
    const cacheKey = "chapter-application";
    const cached = cache.get<Application>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchContent(QUERIES.CHAPTER_APPLICATION);
      const application = data.applicationPageCollection.items[0] || null;
      if (application) {
        cache.set(cacheKey, application);
      }
      return application;
    } catch (error) {
      console.error("Error fetching chapter application:", error);
      return null;
    }
  }

  static async getNonprofitApplication(): Promise<Application | null> {
    const cacheKey = "nonprofit-application";
    const cached = cache.get<Application>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchContent(QUERIES.NONPROFIT_APPLICATION);
      const application = data.applicationPageCollection.items[0] || null;
      if (application) {
        cache.set(cacheKey, application);
      }
      return application;
    } catch (error) {
      console.error("Error fetching nonprofit application:", error);
      return null;
    }
  }

  // Utility methods
  static clearCache(): void {
    cache.clear();
  }

  static async revalidateContent(keys?: string[]): Promise<void> {
    if (keys) {
      keys.forEach((key) => cache.get(key)); // This will remove expired entries
    } else {
      cache.clear();
    }
  }
}
