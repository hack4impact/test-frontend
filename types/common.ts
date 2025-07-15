// Global type augmentations
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONTENTFUL_SPACE_ID: string;
      NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: string;
    }
  }
}

/**
 * Utility types for common patterns
 */
export type WithClassName<T = {}> = T & {
  className?: string;
};

export type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

export type WithOptionalChildren<T = {}> = T & {
  children?: React.ReactNode;
};

/**
 * Animation variant types for motion components
 */
export type AnimationVariant = {
  hidden: any;
  visible: any;
};

/**
 * Common component props that extend HTML elements
 */
export type ComponentPropsWithoutRef<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T>;

/**
 * Helper type for forwarded ref components
 */
export type ForwardedRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;
