export interface Response {
    success: boolean,
    message: string,
    content: any,
}
export interface PageParam {
    page: number,
    limit: number,
}

export interface ListResponse<T> extends Response{
    total: number,
}