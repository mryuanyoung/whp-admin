import React, { useContext } from 'react';
import { UserInfoCtx } from '../../App';
import { Typography, Button, Row, Col } from 'antd';
import { UserInfo as User } from '../../interface/account';
import { UserType } from '../../constant/admin';

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
            {
                userInfo.type === UserType.EADMIN ? (
                    <>
                        <Text>公司: {userInfo.companyName}</Text>
                        <br /><br />
                        <Text>部门: {userInfo.department}</Text>
                        <br /><br />
                        <Text>职位: {userInfo.position}</Text>
                        <br /><br />
                    </>
                ) : null
            }
            <Button onClick={handleLogout} type='primary'>退出登录</Button>
        </div>
    );
};

export default UserInfo;