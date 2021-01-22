import React from 'react';
import ChangePwdBox from '../../components/ChangePwdBox/index';
import UserInfo from '../../components/UserInfo';
import style from './index.module.scss';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const AccountPage = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab='账号信息' key="1">
        <UserInfo />
      </TabPane>
      <TabPane tab="修改密码" key="2">
        <ChangePwdBox />
      </TabPane>
    </Tabs>
  );
};


export default AccountPage;