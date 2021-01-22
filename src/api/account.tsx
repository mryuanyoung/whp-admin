import Axios from '../utils/axios';
import { LoginForm, LoginResponse, PasswordForm } from '../interface/account';


export const login = async (data: LoginForm): Promise<LoginResponse> => {
    const res: LoginResponse = await Axios.post('/both/login', data);
    return res;
}

export const changePassword = async (param: PasswordForm) => {
    try {
        await Axios.post('/web/editPwd', param);
    }
    catch (error) {
        console.log(error);
    }
}