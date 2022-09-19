import type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosResponse
} from 'axios'

interface InterceptorsConfig {
    reqFn?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    reqRejFn?: (error: any) => any
    resFn?: <T = AxiosResponse>(value: T) => T | Promise<T>
    resRejFn?: (error: any) => any
}

interface HyConfig extends AxiosRequestConfig {
    interceptorsFn?: InterceptorsConfig
}

export type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosInterceptorManager,
    InterceptorsConfig,
    HyConfig
}
