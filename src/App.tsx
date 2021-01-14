import React, { lazy, Suspense, useState, createContext, Dispatch, SetStateAction } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import { Layout, Menu, Spin } from 'antd';
import {
    WarningOutlined,
    ExperimentOutlined,
    SwapOutlined,
    TeamOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined

} from '@ant-design/icons';
import { UserType, typeMD5 } from './constant/admin';

import AlarmPage from './pages/Alarm/index';
import LoginPage from './pages/Login/index';
const AccountPage = lazy(() => import('./pages/Account/index'));
const ChemicalsPage = lazy(() => import('./pages/Chemicals/index'));
const EnterpriseAdministratorsPage = lazy(() => import('./pages/EntAdmins/index'));
const EnterpriseMembersPage = lazy(() => import('./pages/EntMembers/index'));
const TransferPage = lazy(() => import('./pages/Transfer/index'));

const { Header, Content, Footer, Sider } = Layout;

export const TypeContext = createContext({ type: '', setType: (() => { }) as Dispatch<SetStateAction<string>> });
/**
 *  @desc 根组件，控制路由
 */
function App() {
    // const [collapsed, setCollapsed] = useState(false);
    const stype = localStorage.getItem('type') || '';
    const [type, setType] = useState(stype);

    return (
        <TypeContext.Provider value={{ type, setType }}>
            <Router>
                {type ? null : <Redirect push to='/login' exact>请登录</Redirect>}
                <Switch>

                    <Route path='/login'><LoginPage /></Route>
                    <Route path='/'>
                        <Layout>
                            <Sider
                                // trigger={null} collapsible collapsed={collapsed}
                                style={{
                                    overflow: 'auto',
                                    height: '100vh',
                                    position: 'fixed',
                                    left: 0,
                                }}
                                width='150'
                            >
                                <div className="logo" />
                                <Menu theme="dark" mode="inline" >
                                    <Menu.Item key="1" icon={<WarningOutlined />}><Link to='/alarm'>报警信息</Link></Menu.Item>
                                    {
                                        type === typeMD5.get(UserType.SADMIN) ? (
                                            <>
                                                <Menu.Item key="2" icon={<TeamOutlined />}><Link to='/entadmins'>企业管理员</Link></Menu.Item>
                                                <Menu.Item key="3" icon={<ExperimentOutlined />}><Link to='/chemicals'>化学品</Link></Menu.Item>
                                            </>
                                        ) : null
                                    }
                                    {
                                        type === typeMD5.get(UserType.EADMIN) ? (
                                            <>
                                                <Menu.Item key="4" icon={<TeamOutlined />}><Link to='/entmembers'>企业成员</Link></Menu.Item>
                                                <Menu.Item key="5" icon={<SwapOutlined />}><Link to='/transfer'>流转信息</Link></Menu.Item>
                                            </>
                                        ) : null
                                    }
                                    <Menu.Item key="6" icon={<UserOutlined />}><Link to='/account'>个人中心</Link></Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header className="site-layout-background" style={{ padding: 0 }} >
                                    {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                        className: 'trigger',
                                        onClick: () => {
                                            setCollapsed((s) => !s);
                                        },
                                    })} */}
                                </Header>
                                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, textAlign: 'center' }}>
                                    <Suspense fallback={<Spin></Spin>}>
                                        <Route path='/alarm' exact><AlarmPage /></Route>
                                        <Route path='/entadmins' exact><EnterpriseAdministratorsPage /></Route>
                                        <Route path='/chemicals' exact><ChemicalsPage /></Route>
                                        <Route path='/entmembers' exact><EnterpriseMembersPage /></Route>
                                        <Route path='/transfer' exact><TransferPage /></Route>
                                        <Route path='/account' eaxct><AccountPage /></Route>
                                    </Suspense>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>如有任何问题请联系微信:18280308568</Footer>
                            </Layout>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </TypeContext.Provider>
    );
}

export default App;
