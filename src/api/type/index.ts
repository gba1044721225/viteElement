import type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosResponse
} from 'axios'

interface InterceptorsConfig<T = AxiosResponse> {
    reqFn?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    reqRejFn?: (error: any) => any
    // resFn?: <T>(value: T) => T | Promise<T>
    resFn?: (value: T) => T | Promise<T>
    resRejFn?: (error: any) => any
}

interface HyConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptorsFn?: InterceptorsConfig<T>
}
interface Iaxios<D> {
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

interface Idata {
    data: any
    meta: {
        code?: string | number
        description?: string
        from?: string
        serverity?: string
        tocken?: string
    }
}

export type {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosInterceptorManager,
    InterceptorsConfig,
    HyConfig,
    Iaxios,
    Idata
}
