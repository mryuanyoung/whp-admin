import React from 'react';
import { AlarmInfo } from '../../interface/alarm';
import { List, Tag } from 'antd';
import style from './index.module.scss';
import moment from 'moment';
import { FieldTimeOutlined } from '@ant-design/icons';

const Time = (props: { time: string }) => {
    return (
        <>
            <FieldTimeOutlined style={{marginRight: '10px'}}/>
            <span>{props.time} - {moment(props.time).fromNow()}</span>
        </>
    )
}

const AlarmItem = (props: { info: AlarmInfo }) => {
    const { info } = props;
    return (
        <div className={style.alarmItem}>
            <List.Item.Meta
                title={<Tag color='blue' className={style.title}>{info.title}</Tag>}
                description={<Time time={info.createTime} />}
            //状态标签
            />
            {info.address}
        </div>
    );
};

export default AlarmItem;