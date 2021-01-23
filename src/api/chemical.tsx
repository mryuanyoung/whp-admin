import Axios from '../utils/axios';
import { AnyResponse } from '../interface/index';
import { ChemicalInfo, ChemicalList, ChemicalParam, updateForm } from '../interface/chemical';

export const getChemicalList = async (param: ChemicalParam): Promise<ChemicalList> => {
    const res: ChemicalList = await Axios.get('/both/getChemicalList', {
        params: param
    });
    return res;
}

export const addChemical = async (data: ChemicalInfo): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/addChemical', data);
    return res;

}

export const updateChemical = async (data: updateForm): Promise<AnyResponse> => {
    const res: AnyResponse = await Axios.post('/web/editChemical', data);
    return res;
}

export const deleteChemical = async (id: number): Promise<AnyResponse> => {

    const res: AnyResponse = await Axios.post('/web/deleteChemical', null, {
        params: { id }
    })
    return res;
}