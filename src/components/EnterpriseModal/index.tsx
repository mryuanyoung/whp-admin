import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ModalProps } from '../../pages/EntInfo';
import { Modal, Form, Input, Button } from 'antd';
import { EnterpriseInfoID, EnterpriseInfo } from '../../interface/enterprise';
import { addEntInfo, updateEntInfo } from '../../api/entInfo';
import style from './index.module.scss';

interface Props {
    modalProps: ModalProps,
    setModalProps: Dispatch<SetStateAction<ModalProps>>,
    setFresh: () => void,
}

const getTitle = (type: number): string => {
    let t = type === 0 ? '新增' : '更新';
    t += '企业';
    return t;
}

const EnterpriseModal: React.FC<Props> = (props) => {

    const { modalProps, setModalProps, setFresh } = props;
    const { visible, initDate, type } = modalProps;
    const [loading, setLoading] = useState(false);
    const [enterprise, setEnterprise] = useState<EnterpriseInfoID>({} as EnterpriseInfoID);

    useEffect(() => {
        if (initDate) {
            setEnterprise(initDate);
        }
    }, [initDate]);


    const handleCancel = useCallback(() => {
        setModalProps({ ...modalProps, visible: false });
        setEnterprise({} as EnterpriseInfoID);
        setLoading(false);
    }, []);

    const onFinish = async (value: EnterpriseInfo) => {
        setLoading(true);
        if (type === 0) {
            //新增
            await addEntInfo(value);
        }
        else {
            //修改
            await updateEntInfo({ ...value, id: initDate!.id })
        }
        setLoading(false);
        handleCancel();
        setFresh();
    };

    return (
        <Modal
            footer={null}
            title={getTitle(type)}
            visible={visible}
            onCancel={handleCancel}
            bodyStyle={{ height: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            width='25vw'
            destroyOnClose
        >
            <Form
                onFinish={onFinish}
                initialValues={initDate}
                scrollToFirstError
            >
                <Form.Item
                    className={style.item}
                    name='name'
                    label='公司'
                    rules={[{ required: true, message: '请输入公司!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className={style.item}
                    name='description'
                    label='描述'
                    rules={[{ required: true, message: '请输入公司描述!' }]}
                >
                    <Input.TextArea autoSize={{minRows: 4, maxRows: 4}}/>
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

export default EnterpriseModal;