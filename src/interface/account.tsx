export interface LoginForm {
    email: string,
    password: string
}

export interface LoginResponse {
    token: string,
    type: string,
}