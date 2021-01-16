export interface LoginForm {
    email: string,
    password: string
}

export interface LoginResponse {
    token: string,
    type: string,
    id: string,
    department: string,
    email: string,
    name: string,
    position: string,
    companyName: string,
}

export interface PasswordForm {
    email: string,
    newPwd: string,
}