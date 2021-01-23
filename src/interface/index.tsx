export interface Response<T> {
    success: boolean,
    message: string,
    content: T,
}

export type AnyResponse = Response<any>;
export interface PageParam {
    page: number,
    limit: number,
}

export interface ListResponse<T> extends Response<T>{
    total: number,
}