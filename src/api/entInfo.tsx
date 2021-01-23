import Axios from '../utils/axios';
import {PageParam, AnyResponse} from '../interface/index';
import {EnterpriseInfoID, EnterpriseInfo, EntInfoResponse } from '../interface/enterprise';

export const getEntInfoList = async(param: PageParam & {key?: string}): Promise<EntInfoResponse> => {
    const res: EntInfoResponse = await Axios.get('/web/getCompanyList', {
        params: param
    });
    return res;
}

export const updateEntInfo = async(param: EnterpriseInfoID): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/editCompany', param);
    return res;
}

export const addEntInfo = async(param: EnterpriseInfo): Promise<AnyResponse> => {
    const res: AnyResponse  = await Axios.post('/web/addCompany', param);
    return res;
}

export const deleteEntInfo = async(id: number): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/deleteCompany', null, {
        params: {id}
    })
    return res;
} ;