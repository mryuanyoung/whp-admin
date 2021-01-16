import React, { useState, useEffect, useCallback, useContext } from 'react';
import {UserInfoCtx} from '../../App';
import {LoginResponse} from '../../interface/account';
import { Table, Tag, Select, message } from 'antd';
import { getAlarmList, handleAlaram } from '../../api/alarm';
import { PAGELIMIT } from '../../constant/index';
import { AlarmState, TagColors } from '../../constant/alarm';
import { AlarmInfo, HandleAlaramParam } from '../../interface/alarm';
import AlarmItem from '../../components/AlarmItem/index';
import style from './index.module.scss';
import moment from 'moment';
import { FieldTimeOutlined, ExperimentOutlined, EditOutlined, RedoOutlined, SettingOutlined } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;
const { Option } = Select;

const AlarmPage = () => {

    const {userInfo} = useContext(UserInfoCtx);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<Array<AlarmInfo>>([]);
    const [page, setPage] = useState(1);

    const getList = useCallback(({ page, limit = PAGELIMIT }) => {
        setLoading(true);
        getAlarmList({ page, limit })
            .then(({ total, data: list }) => {
                setTotal(total);
                if (data.length === 0) {
                    list.length = total;
                    setData(list);
                }
                else {
                    setData((data) => {
                        data.length = total;
                        return data;
                    })
                    setData(data.splice((page - 1) * limit, limit, ...list))
                }
            })
            .catch((error) => {
                console.log(error);
                message.error('网络错误请稍后重试', 2);
            })
            .finally(() => setLoading(false))
    }, []);

    const changeState = useCallback(async(param: HandleAlaramParam) => {
        await handleAlaram(param);
        await getList({page});
        message.success('成功更新状态!', 2);
    }, []);

    useEffect(() => {
        getList({ page: 1 });
    }, []);

    return (
        <Table
            rowKey='title'
            loading={loading}
            sticky
            dataSource={data}
            pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                total
            }}
            expandable={{
                expandedRowRender: ({ id }) => <AlarmItem id={id} />,
                expandIconColumnIndex: 5,
            }}
            onChange={(pagination, filters, sorter, extra) => {
                setPage(pagination.current || 1);
                getList({ page: pagination.current });
            }}
        >
            <Column
                align='center'
                title={<><EditOutlined /><br /><span>标题</span></>}
                dataIndex="title"
                key="title"
            />
            <Column
                align='center'
                title={<><ExperimentOutlined /><br /><span>化学品</span></>}
                dataIndex="chemicalName"
                key="chemicalName"
            />
            <Column
                align='center'
                title={<><RedoOutlined /><br /><span>状态</span></>}
                dataIndex="state"
                key="state"
                render={(text) => <Tag color={TagColors[parseInt(text) - 1]}>{AlarmState[text]}</Tag>}
            />
            <Column
                align='center'
                title={<><FieldTimeOutlined /><br /><span>创建时间</span></>}
                dataIndex="createTime"
                key="createTime"
                render={(text) => <span>{text}<br />{moment(text).fromNow()}</span>
                }
            />
            <Column
                align='center'
                title={<><SettingOutlined /><br /><span>操作</span></>}
                key="action"
                render={(text: AlarmInfo) => (
                    <Select defaultValue={text.state} style={{ width: '6.2rem' }} onChange={(v)=> changeState({alarmId: text.id, state: v, managerId: parseInt(userInfo.id) })}>  
                        {[1,2,3,4].map((item => <Option value={item} disabled={text.state === item} key={item}>{AlarmState[item]}</Option>))}
                    </Select>
                )}
            />
        </Table>
    )
};

export default AlarmPage;