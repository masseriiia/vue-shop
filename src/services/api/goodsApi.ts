import type { Good } from "@/types/good";
import { instance } from "./baseApi";

type GoodCreateModel = Omit<Good, 'id' | 'updatedAt' | 'createdAt' | 'createdBy'>
type GoodUpdateModel = Pick<Good, 'id'> & GoodCreateModel 

export async function fetchGoods() {
  const { data } = await instance.get('/goods')
  return data
}

export async function createGood(good: GoodCreateModel) {
  const { data } = await instance.post('/goods', good)
  return data
}

export async function updateGood(good: GoodUpdateModel) {
  await instance.put(`/goods/${good.id}`, good)
}

export async function fetchGoodById(id: number) {
    const { data } = await instance.get(`/goods/${id}`)
    return data
}