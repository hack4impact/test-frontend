/**
 * Application configuration
 *
 * Central configuration file for all environment variables,
 * API endpoints, and application constants. This ensures
 * type safety and prevents runtime errors from missing env vars.
 */

/**
 * Validates that required environment variables are present
 * and throws descriptive errors if they're missing
 */
function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Please check your .env.local file and ensure this variable is set.`,
    );
  }
  return value;
}

/**
 * Contentful CMS configuration
 */
export const contentfulConfig = {
  spaceId: validateEnvVar(
    "NEXT_PUBLIC_CONTENTFUL_SPACE_ID",
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  ),
  accessToken: validateEnvVar(
    "NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN",
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  ),
  previewMode: process.env.NODE_ENV === "development",
  apiUrl: "https://graphql.contentful.com/content/v1/spaces",
  cdnUrl: "https://cdn.contentful.com/spaces",
} as const;

/**
 * External service URLs
 */
export const externalUrls = {
  donation: "https://opencollective.com/Hack4Impact",
  github: "https://github.com/hack4impact",
  linkedin: "https://www.linkedin.com/company/hack4impact/",
  facebook: "https://www.facebook.com/Hack4Impact/",
  instagram: "https://www.instagram.com/hack4impact/",
  medium: "https://medium.com/@hack4impact",
  notion:
    "https://www.notion.so/h4i/Hack4Impact-Home-a8145b7695d64f04bca8acb5094d5c83",
} as const;

/**
 * Application metadata
 */
export const appConfig = {
  name: "Hack4Impact",
  description: "Code for the common good",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hack4impact.org",
  contactEmail: "contact@hack4impact.org",
  version: process.env.npm_package_version || "1.0.0",
} as const;

/**
 * Design system configuration
 */
export const designTokens = {
  colors: {
    brand: {
      blue: "#0085FF",
      blueMid: "#80C2FF",
      blueLight: "#C0E1FF",
      green: "#10B875",
      greenMid: "#88DCBA",
      greenLight: "#C4EEDD",
      red: "#F2594B",
      redMid: "#F9ACA5",
      redLight: "#FCD6D2",
      black: "#333333",
    },
    ui: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      primary: "oklch(0.3211 0 0)",
      secondary: "oklch(0.97 0 0)",
      muted: "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.922 0 0)",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  typography: {
    fonts: {
      sans: ["Inclusive Sans", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.625rem",
    xl: "0.75rem",
    full: "9999px",
  },
} as const;

/**
 * Animation configuration
 */
export const animationConfig = {
  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easings: {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

/**
 * Content limits and pagination
 */
export const contentLimits = {
  projectsPerPage: 6,
  chaptersPerPage: 12,
  postsPerPage: 10,
  maxSearchResults: 20,
  featuredProjectsCount: 3,
  recentPostsCount: 5,
} as const;

/**
 * SEO configuration
 */
export const seoConfig = {
  defaultTitle: appConfig.name,
  defaultDescription: appConfig.description,
  titleTemplate: `%s | ${appConfig.name}`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appConfig.url,
    siteName: appConfig.name,
    images: [
      {
        url: `${appConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: appConfig.description,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hack4impact",
    creator: "@hack4impact",
  },
} as const;

/**
 * Feature flags for enabling/disabling features
 */
export const featureFlags = {
  enableNewsletter: true,
  enableBlog: false,
  enableTestimonials: true,
  enableApplications: true,
  enableAnalytics: process.env.NODE_ENV === "production",
} as const;

/**
 * Development configuration
 */
export const devConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  enableDebugMode: process.env.NEXT_PUBLIC_DEBUG === "true",
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || "info",
} as const;

/**
 * API configuration
 */
export const apiConfig = {
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  defaultHeaders: {
    "Content-Type": "application/json",
  },
} as const;
