export interface AllCategories {
  results: number
  metadata: Metadata
  data: CategoryDetailes[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryDetailes {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}