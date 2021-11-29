import { API_URI } from '@/constants'
import { isDev } from '@/function'
import { useEffect, useState } from 'react'

export const fillURLParameter = <URLParams>(
  route: string,
  param: URLParams
) => {
  if (!route.includes(':')) return route

  const filled = Object.entries(param).reduce(
    (replaced, [key, value]) => replaced.replace(':' + key, value.toString()),
    route
  )

  if (filled.includes(':')) {
    throw new Error(
      'Not enough parameter, not found: ' + filled.split(':').slice(1).join('')
    )
  }

  return filled
}

interface APIConnectorConfig<URLParams, ReqType, ResType> {
  needAuth: boolean
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  mockHandler(
    req?: URLParams
  ): (ResType | undefined) | Promise<ResType | undefined>
}

export function createAPIConnector<
  URLParams extends {},
  ReqType extends {} | undefined,
  ResType extends {}
>(uri: string, config: APIConnectorConfig<URLParams, ReqType | undefined, ResType>) {
  return {
    useHook(urlParams: URLParams, reqBody?: ReqType) {
      const [data, setData] = useState<ResType>()
      const [error, setError] = useState<Error>()
      const [loaded, setLoaded] = useState(false)
      const loadData = () => {
        if (isDev && config.mockHandler) {
          setTimeout(async () => {
            const responseData = await config.mockHandler(urlParams)
            setData(responseData)
            setLoaded(true)
            return
          }, 1000)

          const reqUri = fillURLParameter(uri, urlParams)

          fetch(API_URI + reqUri, {
            method: config.method,
            body: JSON.stringify(reqBody),
          })
            .then((r) => r.json())
            .then((data) => {
              setData(data)
              setLoaded(true)
            })
            .catch((error) => {
              if (error instanceof Error) setError(() => error)
              if (error.message) setError(() => new Error(error.message))
              setError(() => new Error(error))
            })
        }
      }

      useEffect(() => loadData(), [reqBody])

      return {
        reload: loadData,
        data,
        error,
      }
    },
  }
}

export type Doc<Type> = Type & {
  _id: string
}

type ResPlate = Record<string, string | number>

export const createMockModel = <DataType>(
  dataName: string,
  init: Doc<DataType>[] = []
) => {
  let datas = [...init]
  let uniqueIndex = 0
  return {
    dataName,
    get:
      <ResType extends ResPlate | undefined>(idKey: string) =>
        (reqData: ResType) => {
          console.log(reqData)
          if (!reqData) throw new Error('Cannot find error to find docment')
          return datas.find((data) => data._id === reqData[idKey]) || undefined
        },
    create: () => (reqData: DataType) => {
      const createdDocument: Doc<DataType> = {
        _id: (uniqueIndex++).toString(),
        ...reqData,
      }
      return createdDocument
    },
  }
}
