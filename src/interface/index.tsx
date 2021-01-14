export interface Response {
    success: boolean,
    message: string,
    content: any,
}

export interface PageParam {
    page: number,
    limit: number,
}