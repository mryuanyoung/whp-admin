import React, { useState, Dispatch, SetStateAction } from 'react';
import AdminTable from '../../components/AdminTable/index';
import AdminModal from '../../components/AdminModal/index';
import { Button, Divider } from 'antd';
import style from './index.module.scss';
import { AdminInfo } from '../../interface/admin';

export interface ModalProps {
    visible: boolean,
    type: [number, number],   //[0]: 0=新增 1=修改   [1]: 1=管理员 2=超级管理员
    initDate?: AdminInfo,
}

interface Props {
    type: number
}

const EnterpriseAdministratorsPage: React.FC<Props> = (props) => {

    const { type } = props;

    const [modalProps, setModalProps] = useState<ModalProps>({ visible: false, type: [0, type] });

    return (
        <div id={style.container}>
            <Button id={style.addAdmin} type='primary' onClick={() => setModalProps({ ...modalProps, visible: true })}>新 增</Button>
            <Divider />
            <AdminTable type={type} setModalProps={setModalProps} />
            <AdminModal modalProps={modalProps} setModalProps={setModalProps} />
        </div>
    );
};

export default EnterpriseAdministratorsPage;