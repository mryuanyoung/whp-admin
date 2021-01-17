import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Modal, Form, Input, Button, AutoComplete } from 'antd';
import { BaseAdmin } from '../../interface/admin';
import { ModalProps } from '../../pages/EntAdmins/index';
import { addAdmin, updateAdmin } from '../../api/admin';
import style from './index.module.scss';

interface Props {
    modalProps: ModalProps,
    setModalProps: Dispatch<SetStateAction<ModalProps>>
}

interface Company {
    name: string,
    id: number,
}

interface Option {
    label: string
    value: string,
    id: number,
}

const getTitle = (type: [number, number]): string => {
    let t = type[0] === 0 ? '新增' : '更新';
    t += '企业';
    t += type[1] === 2 ? '管理员' : '成员';
    return t;
}

// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 8 },
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 16 },
//     },
// };

const AdminModal: React.FC<Props> = (props) => {
    const { modalProps, setModalProps } = props;
    const { visible, type, initDate } = modalProps;
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<Array<Option>>([]);
    const [company, setCompany] = useState<Company>({} as Company);

    if (initDate) {
        //有初始值，说明是修改，先查询公司id，不然提交表单没有id
        // setCompany({name: initDate.CompanyName, id:})
    }

    const handleCancel = useCallback(() => {
        setModalProps({ ...modalProps, visible: false });
        setCompany({} as Company);
        setLoading(false);
    }, []);

    const onFinish = async (value: BaseAdmin & { CompanyName: string }) => {
        console.log(value, company);
        setLoading(true);
        if (type[0] === 0) {
            //新增
            await addAdmin({ ...value, company_id: company.id, type: type[1] });
        }
        else {
            //修改
            await updateAdmin({ ...value, company_id: company.id, type: type[1], id: initDate!.id })
        }
        setLoading(false);
    };

    //todo 防抖
    const handleSearch = (value: string) => {
        console.log('搜索id');
        setOptions(value ? [{ value: '字节跳动', label: '字节跳动', id: 1 }, { value: '阿里巴巴', label: '阿里巴巴', id: 2 }] : []);
    };

    const onSelect = (_: string, option: any) => {
        setCompany({ name: option.value, id: option.id });
    };


    return (
        <Modal
            footer={null}
            title={getTitle(type)}
            visible={visible}
            onCancel={handleCancel}
            bodyStyle={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            width='25vw'
            destroyOnClose
        >
            <Form
                // {...formItemLayout}
                onFinish={onFinish}
                initialValues={initDate}
                scrollToFirstError
            >
                <Form.Item
                    name='CompanyName'
                    className={style.item}
                    label='公司'
                    rules={[
                        { required: true, message: '请输入公司名!' },
                        {
                            validator: (rule, value) => {
                                console.log(value, company);
                                return (company.name && company.name === value) ? Promise.resolve() : Promise.reject()
                            },
                            message: '请从下拉框中选择',
                        }
                    ]}
                >
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                        defaultActiveFirstOption={false}
                        options={options}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                    />
                </Form.Item>
                <Form.Item
                    className={style.item}
                    name='department'
                    label='部门'
                    rules={[{ required: true, message: '请输入部门!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className={style.item}
                    name='position'
                    label='职位'
                    rules={[{ required: true, message: '请输入管理员职位!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className={style.item}
                    name='name'
                    label='姓名'
                    rules={[{ required: true, message: '请输入管理员姓名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className={style.item}
                    name='email'
                    label='邮箱'
                    rules={[
                        {
                            type: 'email',
                            message: '请输入正确的邮箱地址!',
                            // validateTrigger: 'onBlur'
                        },
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                    ]}
                >
                    <Input onBlur={() => { }} />
                </Form.Item>
                <Form.Item
                    className={style.item}
                    name='password'
                    label='密码'
                    rules={[{ required: true, message: '请输入管理员密码!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" id={style.submit}>
                        提 交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AdminModal;