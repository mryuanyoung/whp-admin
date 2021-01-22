import { Response, ListResponse } from './index';

export interface TransferInfo {
    id: number;
    chemicalId: number;
    chemicalName: string;
    bn: string; //产品批号
    enterprise: string; //企业名称
    state: number; //1生产 | 2存储 | 3运输 | 4经营
    remarks: string; //备注信息
    position: string; //经纬度
    address: string; //具体位置
    create_time: string;
    modify_time: string;
}

export type TransferResponse = Response<TransferInfo>;

export type TransferInfoList = ListResponse<Array<TransferInfo>>;