import { ApiFilled } from '@ant-design/icons';
import React, {useState} from 'react';

const useRequest = async({
    api,
    param,
}: {
    api: Function,
    param: any,
}) => {
    const [loading, setLoading] = useState(true);
    const res = await api(param);
}