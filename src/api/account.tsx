import Axios from '../utils/axios';
import {AnyResponse} from '../interface/index';
import { LoginForm, LoginResponse, PasswordForm } from '../interface/account';


export const login = async (data: LoginForm): Promise<LoginResponse> => {
    const res: LoginResponse = await Axios.post('/both/login', data);
    return res;
}

export const changePassword = async (param: PasswordForm): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/editPwd', param);
    return res;
}