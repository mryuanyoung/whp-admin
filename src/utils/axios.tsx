import axios from 'axios';
import { Response } from '../interface/index';
import {LoginResponse} from '../interface/account';

const localU = localStorage.getItem('u') || '{}';
const {token} = (JSON.parse(decodeURI(localU))) as LoginResponse;

const Axios = axios.create({
    // baseURL: 'http://xxxx',
    timeout: 2000,
    params: {
        token
    }
});

//请求拦截器
Axios.interceptors.request.use(
    (config) => {
        //请求之前
        return config;
    },
    (error) => {
        //错误处理
        return Promise.reject(error);
    }
);

//响应拦截器
Axios.interceptors.response.use(
    (response) => {
        //处理响应数据
        const res: Response = response.data;
        if(res.success){
            return res.content;
        }
        else{
            console.log(res.message);
            throw Error(res.message);
        }
    },
    (error) => {
        //错误处理
        return Promise.reject(error);
    }
);

export const updateAxios = (token: string) => {
    Axios.defaults.params = {token};
}

export default Axios;