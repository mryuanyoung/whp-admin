import React, {useContext} from 'react';
import useLogin from '../../hooks/useLogin';
import {LoginCtx } from '../../App';
import {useHistory} from 'react-router-dom';

const LoginPage = () => {

    
    const {state, changeState} = useContext(LoginCtx);
    const hisroty = useHistory();
    console.log(hisroty);

    return (
        <button onClick={() => {
            changeState(true);
            hisroty.push('/');
        }}>登陆</button>
    );
};

export default LoginPage;