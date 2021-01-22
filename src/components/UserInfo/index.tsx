import React, { useContext } from 'react';
import { UserInfoCtx } from '../../App';
import { Typography, Button } from 'antd';
import {UserInfo as User} from '../../interface/account';

const { Text, Paragraph } = Typography;

const UserInfo: React.FC = () => {
    const { userInfo, setUserInfo } = useContext(UserInfoCtx);
    
    const handleLogout = () => {
        localStorage.removeItem('u');
        setUserInfo({} as User);
    };
    
    return (
        <div>
            <Text>姓名: {userInfo.name}</Text>
            <br /><br />
            <Text>电子邮箱: {userInfo.email}</Text>
            <br /><br />
            <Text>权限类型: {userInfo.type}</Text>
            <br /><br />
            <Button onClick={handleLogout} type='primary'>退出登录</Button>
        </div>
    );
};

export default UserInfo;