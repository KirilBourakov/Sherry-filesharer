import Standeredlink from './standeredlink';
import { useState } from 'react';


export default function LoginLogout(){
    const [log, setLog] = useState(window.localStorage.getItem('key'));
    if (log) {
        return ( 
            <Standeredlink link='/logout' content='Logout' />
        );
    };
    return(
        <Standeredlink link='/login' content='Login / Create account' />
    );
};