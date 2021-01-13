import React from 'react';
import LoginBox from '../../components/LoginBox/index';
import style from './index.module.scss';

const LoginPage = () => {

    return(
        <div id={style.loginPage}>
            <LoginBox />
        </div>
    )

    
};

export default LoginPage;