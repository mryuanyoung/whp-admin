import {ListResponse} from './index';

export interface EnterpriseInfo {
    name: string,
    description: string,
};

export interface EnterpriseInfoID extends EnterpriseInfo{
    id: number,
};

export type EntInfoResponse = ListResponse<EnterpriseInfoID>

