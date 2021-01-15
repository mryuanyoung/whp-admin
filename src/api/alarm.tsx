import Axios from '../utils/axios';
import { AlarmList, HandleAlaramParam } from '../interface/alarm';
import { PageParam } from '../interface/index';

export const getAlarmList = async (page: PageParam = { page: 1, limit: 10 }): Promise<AlarmList> => {
    try {
        const res: AlarmList = await Axios.get('/web/getAlarmList', {
            params: { ...page }
        });
        return res;
    }
    catch (error) {
        const mock = {
            id: 30,
            chemicalId: 35,
            chemicalName: '汞',
            title: '2-氯苯胺泄露',
            type: '1',
            contact: '15996233165',
            username: '秦岭',
            remarks: '请马上处理！！！！！',//备注信息
            position: '118.77944,32.05506',//经纬度
            address: '江苏省南京市鼓楼区汉口路9号',//具体位置
            state: 4,
            handleManagerId: 1,
            createTime: '2020-09-29 16:08:02',
            modifyTime: '2020-09-29 16:09:34',
        };
        const res:AlarmList = {total:80, data: []};
        for(let i=0; i<10; i++){
            res.data.push({...mock, title: '2-氯苯胺泄露     ' + i});
        }
        return res;
    }
}

export const handleAlaram = async(param: HandleAlaramParam ) => {
    try{
        await Axios.post('/web/handleAlarm', param);
    }
    catch(error){
        console.log(error);
    }
}