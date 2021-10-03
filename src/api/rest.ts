import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosResponse
} from 'axios'
import { PlainObject } from '@/types'
import { ApiError, ApiErrorResponse } from '@/types'
import { LabelText } from '@/resources/LabelText'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const get = <T>(url: string, params: PlainObject = {}): Promise<T> => {
  return handlePromise(instance.get(url, { params }))
}

function handlePromise<T>(axiosPromise: AxiosPromise): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axiosPromise
      .then((response: AxiosResponse) => {
        resolve(response.data as T)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(({ request, message, response }: AxiosError<any>) => {
        if (request && !response) {
          return reject(new ApiError(LabelText.NO_CONNECTION))
        }

        if (response) {
          const apiResponse: ApiErrorResponse = {}

          if (response.status) {
            apiResponse.status = response.status
          }

          if (response.data.message) {
            message = response.data.message
          }

          apiResponse.body = response.data

          return reject(new ApiError(message, apiResponse))
        }

        return reject(new ApiError(message))
      })
  })
}
