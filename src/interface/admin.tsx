import {ListResponse} from './index';

export interface AdminList {
    type: number,
    page: number,
    limit: number,
}

export interface BaseAdmin {
    department: string,
    email?: string,
    name: string,
    password: string,
    position: string,
}

export interface AdminInfo extends BaseAdmin {
    id: number,
    companyName: string,
    description: string,
}

export interface AdminForm extends BaseAdmin {
    companyName: string,
    type: number, // 企业用户0 | 管理员1 | 超级管理员2
}


export type AdminListResponse = ListResponse<Array<AdminInfo>>;