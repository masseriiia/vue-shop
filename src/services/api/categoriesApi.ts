import { instance } from './baseApi'

export async function fetchCategories() {
  const { data } = await instance.get('/categories')
  return data
}

export async function createCategory(title: string) {
  const { data } = await instance.post('/categories', { name: title })
  return data
}

export async function deleteCategory(id: number) {
  await instance.delete(`/categories/${id}`)
}

export async function updateCategory(id: number, title: string) {
  await instance.put(`/categories/${id}`, { name: title })
}

export async function fetchCategoryById(id: number) {
  const { data } = await instance.get(`/categories/${id}`)
  return data
}
