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
    request(config: AxiosRequestConfig) {
        this.instance.request(config).then((res) => {
            console.log(res, '1111')
        })
    }
}
