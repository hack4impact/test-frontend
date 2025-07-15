/**
 * API-related type definitions
 *
 * This file contains type definitions for API requests, responses,
 * and error handling throughout the application.
 */

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: string | number;
  details?: Record<string, any>;
}

/**
 * Contentful API query parameters
 */
export interface ContentfulQueryParams {
  limit?: number;
  skip?: number;
  order?: string;
  where?: Record<string, any>;
  include?: number;
}

/**
 * Contentful GraphQL query response
 */
export interface ContentfulResponse<T> {
  data: {
    [key: string]: {
      items: T[];
      total?: number;
    };
  };
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

/**
 * Search parameters
 */
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Form submission response
 */
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: Record<string, any>;
  errors?: Record<string, string[]>;
}

/**
 * Email subscription response
 */
export interface EmailSubscriptionResponse {
  subscribed: boolean;
  email: string;
  message: string;
}

/**
 * Newsletter signup data
 */
export interface NewsletterSignup {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
}

/**
 * Contact form submission data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  organizationType?: "nonprofit" | "university" | "other";
}

/**
 * Chapter application data
 */
export interface ChapterApplicationData {
  universityName: string;
  contactEmail: string;
  contactName: string;
  location: string;
  teamMembers: string[];
  motivation: string;
  experience: string;
  timeline: string;
}

/**
 * Nonprofit application data
 */
export interface NonprofitApplicationData {
  organizationName: string;
  contactEmail: string;
  contactName: string;
  organizationType: string;
  website?: string;
  projectDescription: string;
  timeline: string;
  budget?: string;
  technicalRequirements: string;
}
