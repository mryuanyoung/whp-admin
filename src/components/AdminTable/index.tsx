import React, { useState, useContext, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { Table, Space, message, Modal } from 'antd';
import { getAdminList, deleteAdmin } from '../../api/admin';
import { PAGELIMIT } from '../../constant/index';
import { AdminInfo } from '../../interface/admin';
import { ModalProps } from '../../pages/EntAdmins/index';
import { GoogleOutlined, AlignLeftOutlined, ApartmentOutlined, MailOutlined, SettingOutlined, UserOutlined, GoldOutlined } from '@ant-design/icons';

const { Column } = Table;

interface Props {
    type: number,
    fresh: boolean,
    setModalProps: Dispatch<SetStateAction<ModalProps>>
}

const AdminTable: React.FC<Props> = (props) => {

    const [modal, contextHolder] = Modal.useModal();
    const { type, setModalProps, fresh } = props;
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<Array<AdminInfo>>([]);
    const [page, setPage] = useState(1);

    const getList = useCallback(async ({ page, limit = PAGELIMIT }) => {
        setLoading(true);
        const t = type === 1 ? 0 : 1;
        const { success, message: msg, total, content: list } = await getAdminList({ type: t, page, limit });
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
            message.error(msg, 1);
        }
        setLoading(false);
    }, []);

    const handleUpdateModal = useCallback((data: AdminInfo) => {
        setModalProps((props) => ({ ...props, visible: true, type: [1, type], initDate: data }))
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        modal.confirm({
            title: '确认删除',
            content: `确认删除此企业${type === 1 ? '成员' : '管理员'}?`,
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                setLoading(true);
                await deleteAdmin(id);
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
                rowKey='email'
                loading={loading}
                sticky
                dataSource={data}
                pagination={{
                    hideOnSinglePage: true,
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
                    title={<><UserOutlined /><br /><span>姓名</span></>}
                    dataIndex="name"
                    key="name"
                />
                <Column
                    align='center'
                    title={<><MailOutlined /><br /><span>邮箱</span></>}
                    dataIndex="email"
                    key="email"
                />
                <Column
                    align='center'
                    title={<><GoogleOutlined /><br /><span>公司</span></>}
                    dataIndex="CompanyName"
                    key="CompanyName"
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
                    title={<><ApartmentOutlined /><br /><span>部门</span></>}
                    dataIndex="department"
                    key="department"
                />
                <Column
                    align='center'
                    title={<><GoldOutlined /><br /><span>职位</span></>}
                    dataIndex="position"
                    key="position"
                />
                <Column
                    align='center'
                    title={<><SettingOutlined /><br /><span>操作</span></>}
                    key="action"
                    render={(text: AdminInfo) => {
                        return (
                            <Space size='small'>
                                <a onClick={(e) => { e.preventDefault(); handleUpdateModal(text) }}>更新</a>
                                <a onClick={(e) => { e.preventDefault(); handleDelete(text.id) }}>删除</a>
                            </Space>
                        )
                    }}
                />
            </Table>
            {contextHolder}
        </>
    )
};

export default AdminTable;
