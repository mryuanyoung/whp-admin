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
    GoogleOutlined,
} from '@ant-design/icons';
import { UserType } from './constant/admin';
import { LoginResponse } from './interface/account';
import AlarmPage from './pages/Alarm/index';
import LoginPage from './pages/Login/index';
const AccountPage = lazy(() => import('./pages/Account/index'));
const ChemicalsPage = lazy(() => import('./pages/Chemicals/index'));
const EnterpriseInfoPage = lazy(() => import('./pages/EntInfo/index'));
const EnterpriseAdministratorsPage = lazy(() => import('./pages/EntAdmins/index'));
// const EnterpriseMembersPage = lazy(() => import('./pages/EntMembers/index'));
const TransferPage = lazy(() => import('./pages/Transfer/index'));

const { Header, Content, Footer, Sider } = Layout;

interface CtxType { 
    userInfo: LoginResponse,
    setUserInfo: Dispatch<SetStateAction<LoginResponse>>
}

export const UserInfoCtx = createContext<CtxType>({ userInfo: {} as LoginResponse, setUserInfo: (() => { }) });
/**
 *  @desc 根组件，控制路由
 */
function App() {
    const localU = localStorage.getItem('u') || '{}';
    const info = (JSON.parse(decodeURI(localU))) as LoginResponse;
    const [userInfo, setUserInfo] = useState<LoginResponse>(info);

    return (
        <UserInfoCtx.Provider value={{ userInfo, setUserInfo }}>
            <Router>
                {userInfo.type ? null : <Redirect push to='/login' exact>请登录</Redirect>}
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
                                width='150'
                            >
                                <div className="logo" />
                                <Menu theme="dark" mode="inline" >
                                    <Menu.Item key="1" icon={<WarningOutlined />}><Link to='/alarm'>报警信息</Link></Menu.Item>
                                    {
                                        userInfo.type === UserType.SADMIN ? (
                                            <>
                                                <Menu.Item key="2" icon={<GoogleOutlined />}><Link to='/entinfo'>企业信息</Link></Menu.Item>
                                                <Menu.Item key="3" icon={<TeamOutlined />}><Link to='/entadmins'>企业管理员</Link></Menu.Item>
                                                <Menu.Item key="4" icon={<ExperimentOutlined />}><Link to='/chemicals'>化学品</Link></Menu.Item>
                                            </>
                                        ) : null
                                    }
                                    {
                                        userInfo.type === UserType.EADMIN ? (
                                            <>
                                                <Menu.Item key="5" icon={<TeamOutlined />}><Link to='/entmembers'>企业成员</Link></Menu.Item>
                                                <Menu.Item key="6" icon={<SwapOutlined />}><Link to='/transfer'>流转信息</Link></Menu.Item>
                                            </>
                                        ) : null
                                    }
                                    <Menu.Item key="7" icon={<UserOutlined />}><Link to='/account'>个人中心</Link></Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header className="site-layout-background" style={{ padding: 0 }} ></Header>
                                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, textAlign: 'center' }}>
                                    <Suspense fallback={<Spin></Spin>}>
                                        <Route path='/alarm' exact><AlarmPage /></Route>
                                        <Route path='/entinfo' exact><EnterpriseInfoPage /></Route>
                                        <Route path='/entadmins' exact><EnterpriseAdministratorsPage type={2}/></Route>
                                        <Route path='/chemicals' exact><ChemicalsPage /></Route>
                                        {/* 企业成员页面目前和管理员页面一致，复用管理员页面 */}
                                        {/* <Route path='/entmembers' exact><EnterpriseMembersPage /></Route> */}
                                        <Route path='/entmembers' exact><EnterpriseAdministratorsPage type={1}/></Route>
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
        </UserInfoCtx.Provider>
    );
}

export default App;
