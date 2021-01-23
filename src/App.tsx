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
import {MENU} from './constant/index';
import { UserInfo } from './interface/account';
import LoginPage from './pages/Login/index';
import Home from './components/Home';
import Img from './font.png';
const AlarmPage = lazy(() => import('./pages/Alarm/index'));
const AccountPage = lazy(() => import('./pages/Account/index'));
const ChemicalsPage = lazy(() => import('./pages/Chemicals/index'));
const EnterpriseInfoPage = lazy(() => import('./pages/EntInfo/index'));
const EnterpriseAdministratorsPage = lazy(() => import('./pages/EntAdmins/index'));
// const EnterpriseMembersPage = lazy(() => import('./pages/EntMembers/index'));
const TransferPage = lazy(() => import('./pages/Transfer/index'));

const { Header, Content, Footer, Sider } = Layout;

interface CtxType { 
    userInfo: UserInfo,
    setUserInfo: Dispatch<SetStateAction<UserInfo>>
}

export const UserInfoCtx = createContext<CtxType>({ userInfo: {} as UserInfo, setUserInfo: (() => { }) });
/**
 *  @desc 根组件，控制路由
 */
function App() {
    const localU = localStorage.getItem('u') || '{}';
    const info = (JSON.parse(decodeURI(localU))) as UserInfo;
    const [userInfo, setUserInfo] = useState<UserInfo>(info);
    const pathname = document.location.pathname;

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
                                {/* <img src={Img} className="logo"/> */}
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={[MENU.get(pathname)]}>
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
                                <Content className="site-layout-background" style={{ margin: '16px 8px', padding: 16, textAlign: 'center' }}>
                                    <Suspense fallback={<Spin></Spin>}>
                                        <Route path='/' exact><Home /></Route>
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
                                <Footer style={{ textAlign: 'center', padding: '10px' }}>...</Footer>
                            </Layout>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </UserInfoCtx.Provider>
    );
}

export default App;
