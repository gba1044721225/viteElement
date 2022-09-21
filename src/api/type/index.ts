import type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosResponse
} from 'axios'

interface InterceptorsConfig {
    reqFn?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    reqRejFn?: (error: any) => any
    resFn?: <T = AxiosResponse>(
        value: T
    ) => T | Promise<T> | ((value: AxiosResponse) => AxiosResponse)
    resRejFn?: (error: any) => any
}

interface HyConfig extends AxiosRequestConfig {
    interceptorsFn?: InterceptorsConfig
}
interface Idata<D> {
    config: {
        [index: string]: any
    }
    data: D
    header: {
        [index: string]: any
    }
    status: number
    statusText: string
}

export type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosInterceptorManager,
    InterceptorsConfig,
    HyConfig,
    Idata
}
