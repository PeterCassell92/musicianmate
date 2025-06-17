import axios from 'axios'

export function isAxiosError(error: any) {
  return axios.isAxiosError(error)
}