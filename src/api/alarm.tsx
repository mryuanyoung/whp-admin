import Axios from '../utils/axios';
import { AlarmList, HandleAlaramParam, AlarmDetail } from '../interface/alarm';
import { PageParam, AnyResponse } from '../interface/index';

export const getAlarmList = async (page: PageParam = { page: 1, limit: 10 }): Promise<AlarmList> => {
    const res: AlarmList = await Axios.get('/web/getAlarmList', {
        params: { ...page }
    });
    return res;
}

export const getAlarmDetail = async (alarmId: number): Promise<AlarmDetail> => {
    const res: AlarmDetail = await Axios.get('/web/getAlarmDetail', {
        params: { alarmId }
    })
    return res;

}

export const handleAlaram = async (param: HandleAlaramParam): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/handleAlarm', param);
    return res;
}