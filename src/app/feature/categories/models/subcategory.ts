export interface SubCategory {
  results: number
  metadata: Metadata
  data: SubCategoriesDetailes[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface SubCategoriesDetailes {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}