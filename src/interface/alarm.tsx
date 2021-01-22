import {ListResponse, Response} from './index';

export interface AlarmInfo {
    id: number,
    chemicalId: number,
    chemicalName: string,
    title: string,
    type: string,
    contact: string,
    username: string,
    remarks: string,//备注信息
    position: string,//经纬度
    address: string,//具体位置
    state: number,
    handleManagerId: number,
    createTime: string,
    modifyTime: string,
}

export type AlarmDetail = Response<AlarmInfo>

export type AlarmList = ListResponse<Array<AlarmInfo>>;

export interface HandleAlaramParam {
    alarmId: number,
    state: number,
    managerId: number,
}