import Axios from '../utils/axios';
import { LoginForm, LoginResponse, PasswordForm } from '../interface/account';


export const login = async (data: LoginForm): Promise<LoginResponse> => {
    try {
        const res: LoginResponse = await Axios.post('/both/login', data);
        return res;
    }
    catch (error) {
        //处理登录异常 
        //mock
        return {
            type: '系统管理员',
            token: '12345',
            id: '1',
            department: '南京大学',
            email: '99@qq.com',
            name: 'young',
            position: '校长',
            companyName: '字节跳动',
            // type: '',
            // token: '',
        };
    }
}

export const changePassword = async(param: PasswordForm) => {
    try{
        await Axios.post('/web/editPwd', param);
    }
    catch(error){
        console.log(error);
    }
}