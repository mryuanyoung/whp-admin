import React from 'react';
import LoginBox from '../../components/LoginBox/index';
import style from './index.module.scss';
import font from './font.png';

const LoginPage = () => {

    return(
        <div id={style.loginPage}>
            <img id={style.font} src={font}/>
            <LoginBox />
        </div>
    )

    
};

export default LoginPage;