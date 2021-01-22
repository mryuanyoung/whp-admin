import Axios from '../utils/axios';
import { ChemicalForm, ChemicalInfo, ChemicalList, ChemicalParam, updateForm } from '../interface/chemical';

export const getChemicalList = async (param: ChemicalParam): Promise<ChemicalList> => {
    const res: ChemicalList = await Axios.get('/both/getChemicalList', {
        params: param
    });
    return res;
}

export const addChemical = async (data: ChemicalInfo) => {
    try {
        await Axios.post('/web/addChemical', data);
    }
    catch (error) {
        console.log(error);
    }
}

export const updateChemical = async (data: updateForm) => {
    try {
        await Axios.post('/web/editChemical', data);
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteChemical = async (id: number) => {
    try {
        await Axios.post('/web/deleteChemical', null, {
            params: { id }
        })
    }
    catch (error) {
        console.log(error);
    }
}