import React, {useContext, useState} from 'react';
import { UserInfoCtx } from '../../App';
import { login as loginApi } from '../../api/account';
import {updateAxios} from '../../utils/axios';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { LoginForm } from '../../interface/account';
import style from './index.module.scss';

const LoginBox = () => {
    const {setUserInfo} = useContext(UserInfoCtx);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = async function(values: LoginForm){
        setLoading(true);
        const userInfo = await loginApi(values);
        if(userInfo.token){
            //todo 编解码
            localStorage.setItem('u', encodeURI(JSON.stringify(userInfo)));
            setUserInfo(userInfo);
            updateAxios(userInfo.token);
            message.success('登录成功!', 1);
            history.push('/');
        }
        else{
            message.error('邮箱或密码错误!', 1);
        }
    };

    return (
        <Form
            name="normal_login"
            className={style.loginForm}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: '请输入邮箱!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className={style.loginFormButton}>
                    登 录
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginBox;