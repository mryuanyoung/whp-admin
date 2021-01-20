import Axios from '../utils/axios';
import {PageParam} from '../interface/index';
import {EnterpriseInfoID, EnterpriseInfo, EntInfoResponse } from '../interface/enterprise';

export const getEntInfoList = async(param: PageParam): Promise<EntInfoResponse> => {
    const res: EntInfoResponse = await Axios.get('/web/getCompanyList', {
        params: param
    });
    console.log(res);
    return res;
}

export const updateEntInfo = async(param: EnterpriseInfoID) => {
    const res = await Axios.post('/web/editCompany', param);
}

export const addEntInfo = async(param: EnterpriseInfo) => {
    const res  = await Axios.post('/web/addCompany', param);
}

export const deleteEntInfo = async(id: number) => {
    const res = await Axios.post('/web/deleteCompany', null, {
        params: {id}
    })
} ;