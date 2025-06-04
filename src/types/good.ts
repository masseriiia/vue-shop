export interface Good {
  id: number
  name: string
  price: number | null
  oldPrice: number | null
  photoUrl: string
  updatedAt: string
  createdAt: string
  categoryId: number
  createdBy: number
  description: string
}

export interface GoodsResponse {
  items: Good[]
  page: number
  limit: number
  total: number
}
