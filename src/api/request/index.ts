import axios from 'axios'
import { AxiosRequestConfig, AxiosInstance } from '../type'

export class RequestHy {
    instance: AxiosInstance
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }
}
