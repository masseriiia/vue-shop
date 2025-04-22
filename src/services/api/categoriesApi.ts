import { getAuthToken } from "./authTokenService";
import { instance } from "./baseApi";

export async function fetchCategories() {
    const token = getAuthToken()

    if (!token) {
        console.log('Токен не найден');
        return null
    }

  const response = await instance.get('/categories')
  return response.data
}

export async function createCategory(title: string) {
  const data = await instance.post('/categories', {name: title})
  return data.data
}

export async function deleteCategory(id: number) {
  await instance.delete(`/categories/${id}`)
}

export async function updateCategory(id: number, title: string) {
  await instance.put(`/categories/${id}`, {name: title})
}