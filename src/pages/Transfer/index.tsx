import React, { useState, useCallback, useEffect, useContext } from 'react';
import { TransferInfo } from '../../interface/transfer';
import { getTransferList } from '../../api/transfer';
import { PAGELIMIT } from '../../constant/index';
import { message, Table, Tag } from 'antd';
import moment from 'moment';
import style from './index.module.scss';
import TransferDetail from '../../components/TransferDetail';
import { TagColors, TransferState } from '../../constant/transfer';
import {UserInfoCtx} from '../../App';
import {INVALID_LOGIN_MSG} from '../../constant/index';
import { FieldTimeOutlined, ExperimentOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';

const { Column } = Table;

const TransferPage: React.FC = () => {
    const {setUserInfo} = useContext(UserInfoCtx);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<Array<TransferInfo>>([]);
    const [page, setPage] = useState(1);

    const getList = useCallback(async ({ page, limit = PAGELIMIT }) => {
        setLoading(true);
        const { success, message: msg, content: list, total } = await getTransferList({ page, limit })
        if (success) {
            setTotal(total);
            setData((data) => {
                if (data.length === 0) {
                    list.length = total;
                    return list;
                }
                else {
                    data.length = total;
                    data.splice((page - 1) * limit, limit, ...list);
                    return [...data];
                }
            })
            // message.success(msg, 1);
        }
        else {
            message.error(msg, 2);
            if(msg === INVALID_LOGIN_MSG){
                setUserInfo({} as any);
                localStorage.removeItem('u');
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        getList({ page: 1 });
    }, []);

    return (
        <Table
            rowKey='id'
            loading={loading}
            sticky
            dataSource={data}
            pagination={{
                hideOnSinglePage: true,
                position: ['bottomCenter'],
                showQuickJumper: true,
                total
            }}
            expandable={{
                expandedRowRender: ({ id }) => <TransferDetail id={id} />,
                expandIconColumnIndex: 5,
            }}
            onChange={(pagination, filters, sorter, extra) => {
                setPage(pagination.current || 1);
                getList({ page: pagination.current });
            }}
        >
            <Column
                align='center'
                title={<><EditOutlined /><br /><span>公司</span></>}
                dataIndex="enterprise"
                key="enterprise"
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
                render={(text) => <Tag color={TagColors[parseInt(text) - 1]} className={style.tag}>{TransferState[text]}</Tag>}
            />
            <Column
                align='center'
                title={<><FieldTimeOutlined /><br /><span>创建时间</span></>}
                dataIndex="create_time"
                key="create_time"
                render={(text) => <span>{text}<br />{moment(text).fromNow()}</span>
                }
            />
        </Table>
    )
};

export default TransferPage;