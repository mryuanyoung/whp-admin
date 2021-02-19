import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, AutoComplete, message } from 'antd';
import { BaseAdmin } from '../../interface/admin';
import { ModalProps } from '../../pages/EntAdmins/index';
import { addAdmin, updateAdmin } from '../../api/admin';
import { getEntInfoList } from '../../api/entInfo';
import { PAGELIMIT } from '../../constant/index';
import style from './index.module.scss';
import { debounce } from '../../utils/debounce';
import { UserInfoCtx } from '../../App';
import { INVALID_LOGIN_MSG } from '../../constant/index';
import { updateAxios } from '../../utils/axios';

interface Props {
    modalProps: ModalProps,
    setModalProps: Dispatch<SetStateAction<ModalProps>>,
    setFresh: () => void,
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

const AdminModal: React.FC<Props> = (props) => {
    const { userInfo, setUserInfo } = useContext(UserInfoCtx);
    const { modalProps, setModalProps, setFresh } = props;
    const { visible, type, initDate } = modalProps;
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<Array<Option>>([]);
    const [company, setCompany] = useState<Company>({} as Company);


    const initCompany = useCallback(async (key: string) => {
        const { success, content: list, message, total } = await getEntInfoList({
            page: 1,
            limit: PAGELIMIT,
            key
        })
        if (success && list.length >= 1) {
            setOptions([{ value: list[0].name, label: list[0].name, id: list[0].id }])
            setCompany(list[0]);
        }
    }, []);

    useEffect(() => {
        if ((type[0] === 0 && type[1] !== 2)  //新增成员
            || (type[0] === 1 && type[1] !== 2)) {   //修改成员
            setCompany({ name: userInfo.companyName, id: -1 })
        }

        if (type[0] === 1 && type[1] === 2) { //修改管理员
            initCompany(initDate!.companyName);
        }
    }, [initDate, visible]);

    const handleCancel = useCallback(() => {
        setModalProps({ ...modalProps, visible: false });
        setCompany({} as Company);
        setOptions([]);
        setLoading(false);
    }, []);

    const onFinish = async (value: BaseAdmin & { companyName: string }) => {
        // console.log(value, company);
        setLoading(true);

        const request = type[0] === 0 ? addAdmin : updateAdmin;
        let param: any = {};
        if (type[0] === 1) { //修改 添加id
            param.id = initDate!.id;
            // value.email = undefined;
        }
        param.type = type[1] === 2 ? 1 : 0;
        if (type[1] !== 2) { //企业成员 手动添加companyName
            param.companyName = userInfo.companyName;
        }

        const { success, content, message: msg } = await request({ ...value, ...param });
        if (success) {
            message.success(msg || content, 2);
            handleCancel();
            setFresh();
        }
        else {
            const errStr = msg || content;
            message.error(errStr, 2);
            if (errStr === INVALID_LOGIN_MSG) {
                setUserInfo({} as any);
                localStorage.removeItem('u');
                updateAxios(null);
            }
        }
        setLoading(false);
    };

    const handleSearch = debounce(async (value: string) => {
        if (!value) return;
        const { success, content: list, message: msg, total } = await getEntInfoList({
            page: 1,
            limit: PAGELIMIT,
            key: value
        })
        if (success) {
            if (list.length >= 1) {
                setOptions(list.map(item => ({
                    value: item.name,
                    label: item.name,
                    id: item.id
                })));
            }
        }
        else {
            const errStr = msg || list;
            message.error(errStr, 2);
            if (errStr === INVALID_LOGIN_MSG) {
                setUserInfo({} as any);
                localStorage.removeItem('u');
                updateAxios(null);
            }
        }
    }, 200);

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
                onFinish={onFinish}
                initialValues={initDate}
                scrollToFirstError
            >
                <Form.Item
                    name='companyName'
                    className={style.item}
                    label='公司'
                    rules={[
                        {
                            required: true,
                            validator: (rule, value) => (!value && type[1] === 2) ? Promise.reject() : Promise.resolve(),
                            message: '请输入公司名',
                        },
                        {
                            validator: (rule, value) => {
                                // console.log(value, company);
                                if (type[1] === 2) {
                                    return (company.name && company.name === value) ? Promise.resolve() : Promise.reject();
                                }
                                else {
                                    return Promise.resolve();
                                }
                            },
                            message: '请从下拉框中选择',
                        }
                    ]}
                >
                    <AutoComplete
                        defaultValue={type[0] === 0 && type[1] === 2 ? '' : company.name}
                        disabled={type[1] === 1}
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
                    <Input disabled={type[0] !== 0} />
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