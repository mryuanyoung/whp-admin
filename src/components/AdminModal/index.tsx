import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Modal } from 'antd';
import {AdminInfo} from '../../interface/admin';
import {ModalProps} from '../../pages/EntAdmins/index';

interface Props {
    modalProps: ModalProps,
    setModalProps: Dispatch<SetStateAction<ModalProps>>
}

const getTitle = (type: [number, number]): string => {
    let t = type[0] === 0 ? '新增' : '更新';
    t += '企业';
    t += type[1] === 0 ? '管理员' : '成员';
    return t;
}

const AdminModal: React.FC<Props> = (props) => {
    const { modalProps, setModalProps } = props;
    const {visible, type, initDate} = modalProps;
    console.log(visible, type, initDate);
    const [loading, setLoading] = useState(false);

    const handleOk = useCallback(async() => {
        setLoading(true);

    }, []);

    const handleCancel = useCallback(() => {
        setModalProps({...modalProps, visible: false});
        setLoading(false);
    }, []);

    return (
        <Modal
            okText='提交'
            cancelText='取消'
            title={getTitle(type)}
            visible={visible}
            confirmLoading={loading}
            onOk={handleOk}
            onCancel={handleCancel}
        >

        </Modal>
    );
};

export default AdminModal;