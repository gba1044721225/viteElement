import { rejects } from 'assert'
import axios from 'axios'
import { AxiosRequestConfig, AxiosInstance, InterceptorsConfig, HyConfig } from '../type'

export class RequestHy {
    //axios实例类型
    instance: AxiosInstance
    //拦截器函数类型
    interceptorsFn?: InterceptorsConfig
    constructor(config: HyConfig) {
        //初始化
        this.instance = axios.create(config)
        this.interceptorsFn = config.interceptorsFn
        //拦截器
        this.instance.interceptors.request.use(
            this.interceptorsFn?.reqFn,
            this.interceptorsFn?.reqRejFn
        )
        this.instance.interceptors.response.use(
            this.interceptorsFn?.resFn,
            this.interceptorsFn?.resRejFn
        )
    }

    request<T>(config: HyConfig): Promise<T> {
        // console.log(22222)
        return new Promise((resolve, rejects) => {
            if (config.interceptorsFn?.reqFn) {
                config = config.interceptorsFn.reqFn(config) as AxiosRequestConfig<any>
            }
            this.instance.request<any, T>(config).then((res) => {
                if (config.interceptorsFn?.resFn) {
                    res = config.interceptorsFn.resFn(res) as T
                }
                resolve(res)
            })
        })
    }
}
