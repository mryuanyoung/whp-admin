import React, { useState, useContext, Dispatch, SetStateAction,Context } from 'react';

interface RType {
    ctx: Context<boolean>,
    setLogin: Dispatch<SetStateAction<boolean>>
}


const useLogin = ():RType => {
    
    console.log('render useLogin');
    const [login, setLogin] = useState<boolean>(false);
    const ctx = React.createContext(login);

    return {
        ctx,
        setLogin
    };
}

// export const useLoginState = () => useContext(ctx);

export default useLogin;