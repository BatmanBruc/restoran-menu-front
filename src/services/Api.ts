import axios from 'axios'
import Cookies from 'js-cookie';
import type { AxiosError, AxiosResponse, CreateAxiosDefaults } from 'axios'
import type { AxiosInstance } from 'axios'
import { notification } from 'ant-design-vue';
import config from '../config'

interface ErrorOfServer{
    description: string
    сode: number
}
interface SuccessOfServer{
    description?: string,
    content?: any
}
export class Api{
    private instance: AxiosInstance
    constructor(oprions?: CreateAxiosDefaults){
        this.instance = axios.create({
            baseURL: config.api_domain,
            withCredentials: true,
            headers: {
                'Authorization': Cookies.get('auth_token')
            },
            ...oprions
          });
    }

    async get(path: string, params?: { [key:string]: any }): Promise<any>{
        return await this.instance.get(path, params)
    }

    async post(path: string, data?: { [key:string]: any }): Promise<any>{
        return await this.instance.post(path, data)
    }

    async delete(path: string, params?: { [key:string]: any }): Promise<any>{
        return await this.instance.delete(path, params)
    }

    static showEror(error: AxiosError<ErrorOfServer> & AxiosError): void{
        if(error.response)
            notification.error({
                message: 'Ошибка: ' + error.response.data.сode,
                description: error.response.data.description
            })
        else
            notification.error({
                message: 'Ошибка',
                description: error.message
            })
    }
    static showSuccess(response: AxiosResponse<SuccessOfServer>): void{
        if(response)
            notification.success({
                message: response.data.description,
                description: response.data.content
            })
    }
}
