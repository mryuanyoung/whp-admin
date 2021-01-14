import React, { useState, useEffect } from 'react';
import { List, Avatar, Space } from 'antd';
import {getAlarmList} from '../../api/alarm';
import {PAGELIMIT} from '../../constant/index';
import {AlarmInfo} from '../../interface/alarm';
import AlarmItem from '../../components/AlarmItem/index';
import style from './index.module.scss';

const AlarmPage = () => {

    const [page, setPage] = useState(1);
    const [data, setData] = useState<Array<AlarmInfo>>([]);
    useEffect(() => {
        getAlarmList({page, limit: PAGELIMIT}).then((res) => {
            setData((data) =>  data.concat(res));
        });
    }, [page]);
    console.log(data.length);

    return (
        // <div></div>
        <List
            itemLayout="vertical"
            size="large"
            id={style.container}
            pagination={{
                onChange: page => {
                    setPage(page);
                },
                total: 200,
                current: page,
                hideOnSinglePage: true,
                showQuickJumper: true
            }}
            dataSource={data}
            renderItem={item => <AlarmItem info={item}/>}
        />
    )
};

export default AlarmPage;