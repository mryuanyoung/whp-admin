import React, { useState, useEffect, useCallback } from 'react';
import { Table, Space, message, Modal, Button, Input } from 'antd';
import { getChemicalList, deleteChemical, } from '../../api/chemical';
import { PAGELIMIT } from '../../constant/index';
import { ChemicalForm } from '../../interface/chemical';
import ChemicalDetail from '../../components/ChemicalDetail/index';
import ChemicalAddition from '../../components/ChemicalAddition';
import style from './index.module.scss';
import { FieldTimeOutlined, ExperimentOutlined, EditOutlined, RedoOutlined, SettingOutlined } from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;

const ChemicalsPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [fresh, setFresh] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [searchStr, setSearchStr] = useState<string | null>(null);
    const [data, setData] = useState<Array<ChemicalForm>>([]);
    const [page, setPage] = useState(1);
    const [drawerData, setDrawerData] = useState<ChemicalForm>({} as ChemicalForm);
    const [modal, contextHolder] = Modal.useModal();

    const getList = useCallback(async ({ page, key = null, limit = PAGELIMIT }) => {
        setLoading(true);
        const { success, message: msg, content: list, total } = await getChemicalList({ page, limit, key });
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
                    //retrun data 不更新视图:useMemo搞的鬼,必须要返回一个新的数组
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

    useEffect(() => {
        getList({ page: 1 });
    }, [fresh]);

    const handleDetail = (value: ChemicalForm) => {
        setVisible(true);
        setDrawerData({ ...value });
    };

    const handleDelete = async (id: number) => {
        modal.confirm({
            title: '确认删除',
            content: `确认删除此化学品?`,
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                setLoading(true);
                await deleteChemical(id);
                await getList({ page });
            }
        });
    }

    const handleAdd = () => {
        setAddVisible(true);
    };

    const handleSearch = async (value: string) => {
        setSearchStr(value);
        setData([]);
        getList({ page: 1, key: value || null })
    }

    return (
        <div>
            <div id={style.header}>
                <Search
                    style={{ width: '25vw' }}
                    enterButton
                    onSearch={handleSearch}
                    placeholder='请输入化学品的名称或CAS号'
                />
                <Button onClick={handleAdd} type='primary'>新增</Button>
            </div>
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
                onChange={(pagination, filters, sorter, extra) => {
                    setPage(pagination.current || 1);
                    getList({ page: pagination.current, key: searchStr || null });
                    document.documentElement.scrollTop = 0
                }}
            >
                <Column
                    align='center'
                    title={<><EditOutlined /><br /><span>中文名称</span></>}
                    dataIndex="cn_name"
                    key="cn_name"
                />
                <Column
                    align='center'
                    title={<><ExperimentOutlined /><br /><span>cas号</span></>}
                    dataIndex="cas"
                    key="cas"
                />
                <Column
                    align='center'
                    title={<><RedoOutlined /><br /><span>分子式</span></>}
                    dataIndex="formula"
                    key="formula"
                />
                <Column
                    align='center'
                    title={<><FieldTimeOutlined /><br /><span>外观与性状</span></>}
                    dataIndex="look"
                    key="look"
                />
                <Column
                    align='center'
                    title={<><FieldTimeOutlined /><br /><span>气味</span></>}
                    dataIndex="smell"
                    key="smell"
                />
                <Column
                    align='center'
                    title={<><SettingOutlined /><br /><span>操作</span></>}
                    key="action"
                    render={(text: ChemicalForm) => (
                        <Space size='small'>
                            <a onClick={(e) => { e.preventDefault(); handleDetail(text) }}>详情</a>
                            <a onClick={(e) => { e.preventDefault(); handleDelete(text.id) }}>删除</a>
                        </Space>
                    )}
                />
            </Table>
            <ChemicalDetail visible={visible} setVisible={setVisible} data={drawerData} />
            <ChemicalAddition visible={addVisible} setVisible={setAddVisible} setFresh={(): void => { setFresh((b) => !b) }} />
            {contextHolder}
        </div>
    );
};

export default ChemicalsPage;