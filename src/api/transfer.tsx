import {TransferInfoList, TransferResponse} from '../interface/transfer';
import {PageParam} from '../interface/index';
import Axios from '../utils/axios';

export const getTransferList = async(param: PageParam): Promise<TransferInfoList> => {
    const res:TransferInfoList = await Axios.get('/web/getTransferList', {
        params: param
    });
    return res;
};

export const getTransferDetail = async(id: number): Promise<TransferResponse> => {
    const res: TransferResponse = await Axios.get('/web/getTransferDetail', {
        params: {
            id
        }
    });
    return res;
};