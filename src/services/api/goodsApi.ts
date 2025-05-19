import type { Good } from '@/types/good'
import { instance } from './baseApi'

type GoodCreateModel = Omit<Good, 'id' | 'updatedAt' | 'createdAt' | 'createdBy'>
type GoodUpdateModel = { id?: number } & GoodCreateModel
type paramsModel = { limit: number; page: number }

export async function fetchGoods(params: paramsModel) {
  const { data } = await instance.get('/goods', { params: params })
  return data
}

export async function createGood(good: GoodCreateModel) {
  const { data } = await instance.post('/goods', good)
  return data
}

export async function deleteGood(id: number) {
  await instance.delete(`/goods/${id}`)
}

export async function updateGood(good: GoodUpdateModel) {
  await instance.put(`/goods/${good.id}`, good)
}

export async function fetchGoodById(id: number) {
  const { data } = await instance.get(`/goods/${id}`)
  return data
}
