import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'universal-cookie'

import { BASE_URL, COOKIE_NAME } from '@/config'

const cookies = new Cookies()

function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  config.headers = config.headers || {}

  const token = cookies.get(COOKIE_NAME)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers.Accept = 'application/json'

  return config
}

function onFulfilled(response: AxiosResponse) {
  return response
}

function onRejected(error: any) {
  return Promise.reject(error)
}

function baseFactory(baseURL: string) {
  return Axios.create({ baseURL })
}

function factory(baseURL: string) {
  const client = baseFactory(baseURL)
  client.interceptors.request.use(authRequestInterceptor)
  client.interceptors.response.use(onFulfilled, onRejected)
  return client
}

export const edunoClient = factory(BASE_URL)
