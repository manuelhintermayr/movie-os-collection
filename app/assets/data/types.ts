/**
 * TypeScript interfaces for the Movie Computer Screens Collection
 * Defines the data structure for movie interface projects
 */

export interface MovieProject {
  /** Project title/name */
  title: string
  /** Film name in multiple languages */
  film: {
    de: string
    en: string
  }
  /** URL to live demo/project */
  url: string | null
  /** GitHub repository URL */
  repo: string | null
  /** Project website/portfolio URL */
  website_url: string | null
  /** Static preview image path or URL */
  image: string
  /** Animated GIF/video preview path or URL */
  animated_image: string | null
  /** Technology stack used */
  stack: string
  /** Project description in multiple languages */
  desc: {
    de: string
    en: string
  }
  /** Categorization tags */
  tags: string[]
}

export type MovieProjects = MovieProject[]