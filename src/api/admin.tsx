import Axios from '../utils/axios';
import { AnyResponse } from '../interface/index';
import { AdminForm, AdminList, AdminListResponse } from '../interface/admin';

export const getAdminList = async (param: AdminList): Promise<AdminListResponse> => {
    const res: AdminListResponse = await Axios.get('/web/getUserList', {
        params: param
    });
    return res;
};

export const updateAdmin = async (param: AdminForm & { id: number }): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/editUser', param);
    return res;
}

export const addAdmin = async (param: AdminForm): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/addUser', param);
    return res;
}

export const deleteAdmin = async (id: number): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/deleteUser', null, {
        params: {
            id
        }
    })
    return res;
}