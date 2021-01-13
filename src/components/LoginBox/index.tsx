import React, {useContext} from 'react';
import {typeMD5 } from '../../constant/admin';
import { TypeContext } from '../../App';
import { login as loginApi } from '../../api/account';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginForm } from '../../interface/account';
import style from './index.module.scss';

const LoginBox = () => {
    const {setType} = useContext(TypeContext);
    const history = useHistory();

    const onFinish = async function(values: LoginForm){
        const res = await loginApi(values);
        if(res.type && res.token){
            localStorage.setItem('token', res.token);
            const md5 = typeMD5.get(res.type)
            localStorage.setItem('type', md5);
            setType(md5)
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
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                    登 录
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginBox;