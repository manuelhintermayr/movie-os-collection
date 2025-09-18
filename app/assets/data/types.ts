export interface MovieProject {
  title: string
  film: {
    de: string
    en: string
  }
  url: string | null
  repo: string | null
  website_url: string | null
  image: string
  animated_image: string | null
  stack: string
  desc: {
    de: string
    en: string
  }
  tags: string[]
}

export type MovieProjects = MovieProject[]