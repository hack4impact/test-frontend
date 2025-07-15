/**
 * Contentful CMS type definitions
 *
 * This file contains all type definitions for content from Contentful CMS.
 * These types mirror the content models defined in Contentful and are used
 * throughout the application for type safety.
 */
import { Document } from "@contentful/rich-text-types";

/**
 * Generic types used across Contentful entries
 */
export interface RichText {
  json: Document;
}

export interface Image {
  url: string;
  name?: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface Collection<T> {
  items: T[];
  total?: number;
  skip?: number;
  limit?: number;
}

/**
 * Project content type
 *
 * Represents both chapter projects and national initiatives
 */
export interface Project {
  /** Unique identifier for the project */
  sys?: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  /** Project hero image */
  photo: Image;

  /** Project name/title */
  name: string;

  /** Categorization tags */
  tags: string[];

  /** Whether this project should be featured on the homepage */
  featuredOnHomePage?: boolean;

  /** Type of project */
  type?: "National Initiative" | "Chapter Project";

  /** Rich text description of the project */
  description: RichText;

  /** External link to project demo/repository */
  link?: string;

  /** Associated chapter (for chapter projects) */
  chapter?: Chapter;
}

/**
 * FAQ content type
 *
 * Used for frequently asked questions on application pages
 */
export interface FAQ {
  /** The question text */
  question: string;

  /** Rich text answer */
  answer: RichText;

  /** Optional category for grouping FAQs */
  category?: string;

  /** Display order */
  order?: number;
}

/**
 * Application page content type
 *
 * Content for chapter and nonprofit application pages
 */
export interface Application {
  /** Type of application */
  applicationType: "New Chapters" | "Nonprofits";

  /** Main header title */
  headerTitle: string;

  /** Hero image for the application page */
  photo: Image;

  /** External link to the application form */
  applicationLink: string;

  /** Rich text description and requirements */
  description: RichText;

  /** Collection of related FAQs */
  faqsCollection: Collection<FAQ>;

  /** Application deadline (optional) */
  deadline?: string;

  /** Whether applications are currently open */
  isOpen?: boolean;
}

/**
 * Chapter content type
 *
 * Represents university chapters of Hack4Impact
 */
export interface Chapter {
  /** University logo */
  universityLogo: Image;

  /** Chapter name (e.g., "Hack4Impact Georgia Tech") */
  name: string;

  /** URL-friendly slug for the chapter */
  slug: string;

  /** City, State/Province, Country */
  location: string;

  /** When the chapter was established */
  establishedDate: string;

  /** Whether this is an incubating chapter */
  incubating: boolean;

  /** Contact email for the chapter */
  email: string;

  /** Chapter website URL */
  websiteLink?: string;

  /** Social media profile URL */
  socialMediaLink?: string;

  /** Type of social media (Instagram, Facebook, etc.) */
  socialMediaLinkType?: string;

  /** GitHub organization or repository URL */
  codeRepoLink?: string;

  /** Chapter group photo */
  photo: Image;

  /** Featured projects from this chapter */
  projects?: Collection<Project>;

  /** Current chapter status */
  status?: "Active" | "Incubating" | "Alumni";

  /** Number of members (optional) */
  memberCount?: number;
}

/**
 * Executive board member content type
 *
 * Represents national board members
 */
export interface ExecMember {
  /** Full name */
  name: string;

  /** Position title */
  title: string;

  /** Rich text bio */
  description: RichText;

  /** Professional headshot */
  photo: Image;

  /** LinkedIn profile URL */
  linkedIn?: string;

  /** Email address */
  email?: string;

  /** University affiliation */
  university?: string;

  /** Graduation year */
  graduationYear?: number;

  /** Display order on the page */
  order?: number;
}

/**
 * Blog post content type (if applicable)
 */
export interface BlogPost {
  /** Post title */
  title: string;

  /** URL slug */
  slug: string;

  /** Post excerpt/summary */
  excerpt?: string;

  /** Featured image */
  featuredImage?: Image;

  /** Rich text content */
  content: RichText;

  /** Post author */
  author: ExecMember;

  /** Publication date */
  publishedDate: string;

  /** Post tags/categories */
  tags?: string[];

  /** Whether the post is published */
  published: boolean;
}

/**
 * Site configuration content type
 */
export interface SiteConfig {
  /** Site title */
  title: string;

  /** Site description */
  description: string;

  /** Contact email */
  contactEmail: string;

  /** Social media links */
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    medium?: string;
  };

  /** Application status */
  applicationsOpen: {
    chapters: boolean;
    nonprofits: boolean;
  };
}

/**
 * Testimonial content type
 */
export interface Testimonial {
  /** Quote text */
  quote: string;

  /** Person's name */
  name: string;

  /** Person's title/role */
  title: string;

  /** Organization name */
  organization: string;

  /** Headshot photo */
  photo?: Image;

  /** Associated project (optional) */
  project?: Project;
}
