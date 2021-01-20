import React, { Dispatch, SetStateAction, useState, useEffect, useCallback } from 'react';
import { ModalProps } from '../../pages/EntInfo';
import { Table, Space, Select, Modal } from 'antd';
import { EnterpriseInfoID } from '../../interface/enterprise';
import { getEntInfoList, deleteEntInfo } from '../../api/entInfo';
import { PAGELIMIT } from '../../constant/index';
import { GoogleOutlined, AlignLeftOutlined, SettingOutlined } from '@ant-design/icons';

const { Column } = Table;

interface Props {
    setModalProps: Dispatch<SetStateAction<ModalProps>>,
    fresh: boolean,
}

const EnterpriseTable: React.FC<Props> = (props) => {

    const [modal, contextHolder] = Modal.useModal();
    const { setModalProps, fresh } = props;
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<Array<EnterpriseInfoID>>([]);
    const [page, setPage] = useState(1);

    const getList = useCallback(async ({ page, limit = PAGELIMIT }) => {
        setLoading(true);
        const { total, content: list } = await getEntInfoList({ page, limit });
        console.log(total, list);
        setTotal(total);
        if (data.length === 0) {
            list.length = total;
            setData(list);
        }
        else {
            setData((data) => {
                data.length = total;
                data.splice((page - 1) * limit, limit, ...list)
                return data;
            });
        }
        setLoading(false);
    }, []);

    const handleUpdateModal = useCallback((data: EnterpriseInfoID) => {
        setModalProps({ ...props, visible: true, initDate: data, type: 1 })
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        modal.confirm({
            title: '确认删除',
            content: `确认删除此企业?`,
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                setLoading(true);
                await deleteEntInfo(id);
                await getList({ page });
            }
        });
    }, []);

    useEffect(() => {
        getList({ page: 1 });
    }, [fresh]);


    return (
        <>
            <Table
                rowKey='id'
                loading={loading}
                sticky
                dataSource={data}
                pagination={{
                    position: ['bottomCenter'],
                    showQuickJumper: true,
                    total
                }}
                onChange={(pagination, filters, sorter, extra) => {
                    setPage(pagination.current || 1);
                    getList({ page: pagination.current });
                }}
            >
                <Column
                    align='center'
                    title={<><GoogleOutlined /><br /><span>公司</span></>}
                    dataIndex="name"
                    key="name"
                />
                <Column
                    ellipsis
                    align='center'
                    title={<><AlignLeftOutlined /><br /><span>公司描述</span></>}
                    dataIndex="description"
                    key="description"
                />
                <Column
                    align='center'
                    title={<><SettingOutlined /><br /><span>操作</span></>}
                    key="action"
                    render={(text: EnterpriseInfoID) => {
                        return (
                            <Space size='small'>
                                <a onClick={() => handleUpdateModal(text)}>更新</a>
                                <a onClick={() => handleDelete(text.id)}>删除</a>
                            </Space>
                        )
                    }}
                />
            </Table>
            {contextHolder}
        </>
    );
};

export default EnterpriseTable;