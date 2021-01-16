import React from 'react';
import ChangePwdBox from '../../components/ChangePwdBox/index';
import style from './index.module.scss';
import {Divider, Typography} from 'antd';

const {Title} = Typography;

const AccountPage = () => {
  return (
      <div >
          <Title level={4} style={{textAlign: 'initial'}}>修改密码</Title>
          <Divider/>
          <ChangePwdBox />
      </div>
  );
};


export default AccountPage;