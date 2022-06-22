import { useEffect, useState } from 'react'
import { API_URI, isDev } from '@/constants'
import { posAuthTokenAtom } from '@/coil'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { toast } from 'react-toastify'

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

const fetchAPI = async (
  uri: string,
  method: string,
  data: any,
  needAuth?: boolean,
  headers?: Record<string, string>
): Promise<Response> => {
  try {
    const auth = getRecoil(posAuthTokenAtom)

    if (needAuth && !auth) {
      toast.info('인증이 필요해요')
      throw new Error()
    }

    const res = await fetch(uri, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...(needAuth && {
          Authorization: `Bearer ${auth!.accessToken}`,
        }),
        ...headers,
      }),
      body: JSON.stringify(data),
    })

    if (!res.ok) throw res
    if (res.status !== 418) return res

    if (!auth?.refreshToken) {
      toast.info('인증이 필요해요')
      throw new Error()
    }

    throw new Error()

    // const tokens = await (
    //   await fetch(API_URI + '/pos-login/refresh', {
    //     method: 'POST',
    //     headers: new Headers({
    //       Authorization: `Bearer ${auth.refreshToken}`,
    //     }),
    //   })
    // ).json()

    // setRecoil(posAuthTokenAtom, {
    //   ...auth,
    //   accessToken: tokens.accessToken,
    //   refreshToken: tokens.refreshToken,
    // })

    // return await fetchAPI(uri, method, data, needAuth, headers)
  } catch (e) {
    if (e instanceof Response) {
      const { message } = await e.json()
      if (message) {
        toast.error(message)
      }
    }
    throw e
  }
}

interface APIConnectorConfig<URLParams, ReqType, ResType> {
  needAuth: boolean
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  mockHandler(
    urlParams?: URLParams,
    reqBody?: ReqType
  ): (ResType | undefined) | Promise<ResType | undefined>
}

export function createAPIConnector<
  URLParams extends {},
  ReqType extends {} | undefined,
  ResType extends {}
>(
  uri: string,
  config: APIConnectorConfig<URLParams, ReqType | undefined, ResType>
) {
  return {
    useHook(urlParams?: URLParams, reqBody?: ReqType) {
      const [data, setData] = useState<ResType>()
      const [error, setError] = useState<Error>()
      const [loaded, setLoaded] = useState(false)

      const loadData = () => {
        if (isDev && config.mockHandler) {
          setTimeout(async () => {
            try {
              const responseData = await config.mockHandler(urlParams)
              setData(responseData)
              setLoaded(true)
            } catch (raisedError) {
              if (raisedError instanceof Error)
                setError(() => raisedError as Error)
              if ((raisedError as Record<string, string>).message)
                setError(
                  () =>
                    new Error((raisedError as Record<string, string>).message)
                )
              setError(() => new Error(raisedError as string))
              setLoaded(true)
            }
          }, 1000)
          return
        }

        const reqUri = fillURLParameter(uri, urlParams)

        fetchAPI(API_URI + reqUri, config.method, reqBody, config.needAuth)
          .then((r) => r.json())
          .then((data) => {
            setData(data)
            setLoaded(true)
          })
          .catch((error) => {
            if (error instanceof Error) setError(() => error)
            if (error.message) setError(() => new Error(error.message))
            setError(() => new Error(error))
            setLoaded(true)
          })
      }

      useEffect(() => loadData(), [reqBody])

      return {
        reload: loadData,
        data,
        error,
        loaded,
      }
    },
    request(
      urlParams?: URLParams,
      reqBody?: ReqType,
      option?: {
        type?: 'text'
        headers?: Record<string, string>
      }
    ) {
      return new Promise<ResType | undefined>((ok, raiseError) => {
        if (isDev && config.mockHandler) {
          setTimeout(async () => {
            try {
              const responseData = await config.mockHandler(urlParams, reqBody)
              ok(responseData)
              return
            } catch (e) {
              raiseError(e)
            }
          }, 1000)
          return
        }

        const reqUri = fillURLParameter(uri, urlParams)

        fetchAPI(
          API_URI + reqUri,
          config.method,
          reqBody,
          config.needAuth,
          option?.headers
        )
          .then((r) => r[option?.type || 'json']())
          .then((data) => {
            ok(data)
          })
          .catch((raisedError) => {
            console.dir(raisedError)
            if (raisedError instanceof Error) raiseError(raisedError)
            if (raisedError.message) raiseError(new Error(raisedError.message))
            raiseError(new Error(raisedError))
          })
      })
    },
  }
}

export type Doc<Type> = Type & {
  id: number
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
      <ResType extends ResPlate | undefined>(
        idKey: string,
        searchProperty?: keyof DataType
      ) =>
        (reqData: ResType) => {
          if (!reqData) throw new Error('Cannot find error to find docment')
          const queried = datas.find(
            (data) =>
              data[searchProperty ? searchProperty : 'id'] === reqData[idKey]
          )
          console.log(datas, reqData)
          if (queried) return queried
          throw new Error(`Cannot find ${dataName} by key "${reqData[idKey]}"`)
        },
    create: () => (reqData: DataType) => {
      const createdDocument: Doc<DataType> = {
        id: uniqueIndex++,
        ...reqData,
      }
      return createdDocument
    },
    getAll: () => {
      return datas
    },
    random: () => {
      return datas[Math.floor(Math.random() * datas.length)]
    },
  }
}
