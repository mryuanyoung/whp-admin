import React, { useContext, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import {changePassword} from '../../api/account';
import {PasswordForm, LoginResponse} from '../../interface/account';
import {UserInfoCtx} from '../../App';
import style from './index.module.scss';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const ChangePwdBox = () => {

    const [loading, setLoding] = useState(false);
    const {setUserInfo} = useContext(UserInfoCtx);

    const onFinish = async(values: PasswordForm) => {
        setLoding(true);
        await changePassword({email: values.email, newPwd: values.newPwd});
        message.success('成功修改密码, 2s后将重新登录', 2);
        setTimeout(() => {
            //清除localStorage,重新登录
            localStorage.removeItem('u');
            setLoding(false);
            setUserInfo({} as LoginResponse);
        }, 2000);
    };

    return (
        <Form
            {...formItemLayout}
            name="normal_login"
            className={style.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label='邮箱'
                rules={[{ required: true, message: '请输入邮箱!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="newPwd"
                label='新密码'
                rules={[{ required: true, message: '请输入新密码!' }]}
            >
                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
            </Form.Item>
            <Form.Item
                name="confirmPwd"
                label='确认密码'
                rules={[
                    {
                      required: true,
                      message: '请确认新密码!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPwd') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('两次输入的密码不一致!');
                      },
                    }),
                  ]}
            >
                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
            </Form.Item>

            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className={style.loginFormButton}>
                    提 交
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ChangePwdBox;