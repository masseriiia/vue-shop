import { instance } from './baseApi'

export async function uploadFile(file: File) {
  console.log(file)
  const formData = new FormData()
  formData.append('file', file)
  const data = await instance.post('files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}
