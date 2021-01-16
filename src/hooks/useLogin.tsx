import React, { useState, useCallback } from 'react';
import { LoginResponse } from '../interface/account';
// import {typeMD5} from '../constant/admin';

/**
 * @desc 用户登录逻辑
 */
const useLogin = (): {
    login: boolean,
    type: string,
    func: ((s: LoginResponse) => void),
} => {
    const [login, setLogin] = useState(false);
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    const signin = useCallback(function (s: LoginResponse) {
        localStorage.setItem('token', s.token);
        // localStorage.setItem('type', typeMD5.get(s.type));
        setLogin(true);
    }, []);

    if (token && type) {
        if (!login) {
            setLogin(true);
        }
        return {
            login,
            type,
            func: function () { }
        };
    }
    else {
        return {
            login,
            type: '',
            func: signin
        };
    }
};

export default useLogin;