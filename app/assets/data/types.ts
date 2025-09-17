export interface MovieProject {
  title: string
  film: string
  url: string | null
  repo: string | null
  image: string
  stack: string
  desc: {
    de: string
    en: string
  }
  tags: string[]
}

export type MovieProjects = MovieProject[]