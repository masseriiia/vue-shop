import { instance } from "./baseApi";

export async function fetchGoods() {
  const { data } = await instance.get('/goods')
  return data
}

export async function createGood(name: string, price: number, oldPrice: number, photoUrl: string, categoryId: number) {
    
  const { data } = await instance.post('/goods', {name, price, oldPrice, photoUrl, categoryId})
  return data
}

export async function updateGood(id: number, name: string, price: number, oldPrice: number, photoUrl: string, categoryId: number) {
  await instance.put(`/goods/${id}`, {name, price, oldPrice, photoUrl, categoryId})
}

export async function fetchGoodById(id: number) {
    const { data } = await instance.get(`/goods/${id}`)
    return data
}