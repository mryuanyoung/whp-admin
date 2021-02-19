import React, { useContext, useEffect, useState } from 'react';
import { TransferInfo } from '../../interface/transfer';
import { getTransferDetail } from '../../api/transfer';
import { Descriptions, Spin, message } from 'antd';
import { TransferState } from '../../constant/transfer';
import style from './index.module.scss';
import {UserInfoCtx} from '../../App';
import {INVALID_LOGIN_MSG} from '../../constant/index';

interface Props {
    id: number,
}

const AlarmItem: React.FC<Props> = (props) => {

    const {setUserInfo} = useContext(UserInfoCtx);
    const {id} = props;
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<TransferInfo>();

    useEffect(() => {
        setLoading(true);
        getTransferDetail(id)
            .then(({ success, message: msg, content }) => {
                if (success) {
                    setDetail(content);
                }
                else{
                    message.error(msg, 2);
                    if(msg === INVALID_LOGIN_MSG){
                        setUserInfo({} as any);
                        localStorage.removeItem('u');
                    }
                }
                setLoading(false);
            });
    }, []);

    return loading ? <Spin /> : (
        <div className={style.expand}>
            <Descriptions
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="公司">{detail!.enterprise}</Descriptions.Item>
                <Descriptions.Item label="化学品">{detail!.chemicalName}</Descriptions.Item>
                <Descriptions.Item label="产品批号">{detail!.bn}</Descriptions.Item>
                <Descriptions.Item label="经纬度">{detail!.position}</Descriptions.Item>
                <Descriptions.Item label="具体位置">{detail!.address}</Descriptions.Item>
                <Descriptions.Item label="状态">{TransferState[detail!.state]}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{detail!.create_time}</Descriptions.Item>
                <Descriptions.Item label="修改时间">{detail!.modify_time}</Descriptions.Item>
                <Descriptions.Item label="备注">{detail!.remarks}</Descriptions.Item>
            </Descriptions>
        </div>
    )
};

export default AlarmItem;