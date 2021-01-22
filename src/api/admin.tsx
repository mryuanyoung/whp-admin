import Axios from '../utils/axios';
import { AdminForm, AdminInfo, AdminList, AdminListResponse } from '../interface/admin';

export const getAdminList = async (param: AdminList): Promise<AdminListResponse> => {
    const res: AdminListResponse = await Axios.get('/web/getUserList', {
        params: param
    });
    return res;
};

export const updateAdmin = async (param: AdminForm & { id: number }) => {
    try {
        const res = await Axios.post('/web/editUser', param);
        return res;
    }
    catch (error) {
        console.log(error);
    }
}

export const addAdmin = async (param: AdminForm) => {
    try {
        const res = await Axios.post('/web/addUser', param);
        return res;
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteAdmin = async (id: number) => {
    try {
        const res = await Axios.post('/web/deleteUser', { id })
        return res;
    }
    catch (error) {
        console.log(error);
    }
}