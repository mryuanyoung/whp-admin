import React from 'react';
import {useHistory} from 'react-router-dom';

const Home: React.FC = () => {

    const history = useHistory();
    history.push('/alarm');

    return (
        <h1>欢迎使用高关注化学品管理系统</h1>
    );
};

export default Home;
