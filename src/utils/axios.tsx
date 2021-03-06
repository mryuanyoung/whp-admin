import React, {useContext} from 'react';
import axios from 'axios';
import {INVALID_LOGIN_MSG} from '../constant/index';
import {UserInfoCtx} from '../App';
import {UserInfo} from '../interface/account';

const localU = localStorage.getItem('u') || '{}';
const {token} = (JSON.parse(decodeURI(localU))) as UserInfo;

const Axios = axios.create({
    baseURL: 'http://121.40.243.225:8082/',
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
        const res = response.data;
        if(!res.success && res.message === INVALID_LOGIN_MSG){
            const user = useContext(UserInfoCtx);
            user.setUserInfo({} as UserInfo);
            localStorage.removeItem('u');
        }
        else{
            return res;
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