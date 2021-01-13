import Axios from '../utils/axios';
import { LoginForm, LoginResponse } from '../interface/account';


export const login = async (data: LoginForm): Promise<LoginResponse> => {
    try {
        const res: LoginResponse = await Axios.post('/both/login', data);
        return res;
    }
    catch(error){
        //处理登录异常 
        //mock
        return {
            type: '系统管理员',
            token: '12345'
            // type: '',
            // token: '',
        };
    }
}