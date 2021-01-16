import React, { useState, Dispatch, SetStateAction } from 'react';
import AdminTable from '../../components/AdminTable/index';
import AdminModal from '../../components/AdminModal/index';
import {Button, Divider} from 'antd';
import style from './index.module.scss';
import {AdminInfo} from '../../interface/admin';

export interface ModalProps {
    visible: boolean,
    type: [number, number],
    initDate?: AdminInfo,
}

const EnterpriseAdministratorsPage = () => {

    const [modalProps, setModalProps] = useState<ModalProps>({visible: false, type: [0, 0]});

    return (
        <div id={style.container}>
            <Button id={style.addAdmin} type='primary' onClick={() => setModalProps({...modalProps, visible: true})}>新 增</Button>
            <Divider />
            <AdminTable type={2} setModalProps={setModalProps}/>
            <AdminModal modalProps={modalProps} setModalProps={setModalProps}/>
        </div>
    );
};

export default EnterpriseAdministratorsPage;