import React, { useEffect, useState } from 'react';
import { AlarmInfo } from '../../interface/alarm';
import { getAlarmDetail } from '../../api/alarm';
import { Descriptions, Spin } from 'antd';
import { AlarmState } from '../../constant/alarm';
import style from './index.module.scss';


const AlarmItem = (props: { id: number }) => {

    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<AlarmInfo>();

    useEffect(() => {
        getAlarmDetail(props.id).then((res) => {
            setDetail(res);
            setLoading(false);
        });
    }, []);

    return loading ? <Spin /> : (
        <div className={style.expand}>
            <Descriptions
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="标题">{detail!.title}</Descriptions.Item>
                <Descriptions.Item label="化学品">{detail!.chemicalName}</Descriptions.Item>
                <Descriptions.Item label="类型">{detail!.type}</Descriptions.Item>
                <Descriptions.Item label="报警人">{detail!.username}</Descriptions.Item>
                <Descriptions.Item label="联系方式">{detail!.contact}</Descriptions.Item>
                <Descriptions.Item label="经纬度">{detail!.position}</Descriptions.Item>
                <Descriptions.Item label="具体位置">{detail!.address}</Descriptions.Item>
                <Descriptions.Item label="状态">{AlarmState[detail!.state]}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{detail!.createTime}</Descriptions.Item>
                <Descriptions.Item label="修改时间">{detail!.modifyTime}</Descriptions.Item>
                <Descriptions.Item label="备注">{detail!.remarks}</Descriptions.Item>
            </Descriptions>
        </div>
    )
};

export default AlarmItem;