import React, {useState} from 'react';
import EnterpriseTable from '../../components/EnterpriseTable/index';
import EnterprisModal from '../../components/EnterpriseModal/index';
import { Button, Divider } from 'antd';
import style from './index.module.scss';
import {EnterpriseInfoID} from '../../interface/enterprise';

export interface ModalProps {
    visible: boolean,
    initDate?: EnterpriseInfoID,
    type: number,
}

const EnterpriseInfoPage: React.FC = () => {

    const [modalProps, setModalProps] = useState<ModalProps>({ visible: false, type: 0 });
    const [fresh, setFresh] = useState(false);

    return (
        <div id={style.container}>
            <Button id={style.addAdmin} type='primary' onClick={() => setModalProps({ visible: true, type: 0 })}>新 增</Button>
            <Divider />
            <EnterpriseTable setModalProps={setModalProps} fresh={fresh}/>
            <EnterprisModal modalProps={modalProps} setModalProps={setModalProps} setFresh={(): void => { setFresh((b) => !b)}} />
        </div>
    );
};

export default EnterpriseInfoPage;