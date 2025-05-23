import type { Good } from '@/types/good'
import { instance } from './baseApi'
import { GOODS_LIMIT } from '@/utils/constants'

type GoodCreateModel = Omit<Good, 'id' | 'updatedAt' | 'createdAt' | 'createdBy'>
type GoodUpdateModel = { id?: number } & GoodCreateModel

export async function fetchGoods(page: number) {
  const { data } = await instance.get('/goods', { params: { page, limit: GOODS_LIMIT } })
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
