import { Response } from './index';

export interface LoginForm {
    email: string,
    password: string
}

export interface UserInfo {
    token: string,
    type: string,
    id: string,
    department: string,
    email: string,
    name: string,
    position: string,
    companyName: string,
}

export type LoginResponse = Response<UserInfo>

export interface PasswordForm {
    email: string,
    newPwd: string,
}