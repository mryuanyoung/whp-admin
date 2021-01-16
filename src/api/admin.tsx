import Axios from '../utils/axios';
import { AdminForm, AdminInfo, AdminList, AdminListResponse } from '../interface/admin';

export const getAdminList = async (param: AdminList): Promise<AdminListResponse> => {
    try {
        const res: AdminListResponse = await Axios.get('/web/getUserList', {
            params: param
        });
        return res;
    }
    catch (error) {
        console.log(error);
        const mock = {
            id:'1',
            department: '南京大学教务处',
            email: '123@qq.com',
            name: '张三',
            password: '123',
            position: '校长',
            CompanyName: '字节跳动',
            description: '宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂宇宙第一大厂',
        }
        const res = [];
        for(let i=0 ;i< 10; i++){
            res.push({...mock, name: mock.name + i});
        }
        return {
            total: 90,
            data: res
        };
    }
};

export const updateAdmin = async(param: AdminForm) => {
    try{
        const res = await Axios.post('/web/editUser', param);
        return res;
    }
    catch(error){
        console.log(error);
    }
}

export const addAdmin = async(param: AdminForm) => {
    try{
        const res = await Axios.post('/web/addUser', param);
        return res;
    }
    catch(error){
        console.log(error);
    }
}

export const deleteAdmin = async(id: number) => {
    try{
        const res = await Axios.post('/web/deleteUser', {id})
        return res;
    }
    catch(error){
        console.log(error);
    }
}