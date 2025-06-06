import type { AxiosProgressEvent } from 'axios'
import { instance } from './baseApi'

export async function uploadFile(file: File, onProgress?: (percent: number)=> void) {
  const formData = new FormData()
  formData.append('file', file)  
  const data = await instance.post('files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: function (progressEvent: AxiosProgressEvent) {
      if(progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        if(onProgress) onProgress(percent)
      }
    }
  })
  return data
}
