import React, { useContext, useState, Dispatch, SetStateAction } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import LoginPage from './pages/Login/login';
import AlarmPage from './pages/Alarm/index';
import './App.css';
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

/**
 *  @desc 根组件，控制路由
 */


export const LoginCtx = React.createContext({
    state: false,
    changeState: (() => { }) as Dispatch<SetStateAction<boolean>>
})

function App() {
    const [login, setLogin] = useState<boolean>(false);

    return (
        <LoginCtx.Provider value={{ state: login, changeState: setLogin }}>
            <Router>
                {login ? null : <Redirect push to='/login' exact>请登录</Redirect>}
                <Switch>
                    <Route path='/login'><LoginPage /></Route>
                    <Route path='/'>
                        <Layout>
                            <Sider
                                style={{
                                    overflow: 'auto',
                                    height: '100vh',
                                    position: 'fixed',
                                    left: 0,
                                }}
                            >
                                <div className="logo" />
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                                    <Menu.Item key="1" icon={<UserOutlined />}>fuck</Menu.Item>
                                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>nav 2</Menu.Item>
                                    <Menu.Item key="3" icon={<UploadOutlined />}>nav 3</Menu.Item>
                                    <Menu.Item key="4" icon={<BarChartOutlined />}>nav 4</Menu.Item>
                                    <Menu.Item key="5" icon={<CloudOutlined />}>nav 5</Menu.Item>
                                    <Menu.Item key="6" icon={<AppstoreOutlined />}>nav 6</Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                                <Header className="site-layout-background" style={{ padding: 0 }} />
                                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                                        <AlarmPage />
                                       FUCKOU
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                    </Route>
                    {/* <Route path='/a'>AAAAAAAA</Route>
                    <Route path='/b'>BBBBBB</Route> */}
                </Switch>

            </Router>
        </LoginCtx.Provider>

    );
}

export default App;
