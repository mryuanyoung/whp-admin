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