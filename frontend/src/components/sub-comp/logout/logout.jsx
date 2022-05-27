import { motion } from 'framer-motion'
import Spinner from 'react-bootstrap/Spinner'
import url from '../../utils/url'
import { UseKeyHook } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export default function Logout(){
    const k = useContext(UseKeyHook)
    const nav = useNavigate()
    logout(k, nav);
    return(
        <div className='d-flex flex-column align-items-center my-auto'>
            <div className='d-flex'>
                <h1>Logging out</h1>
                <motion.h1
                animate={{ y:-25 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                >
                .
                </motion.h1>
                <motion.h1
                animate={{ y:-20 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                >
                .
                </motion.h1>
                <motion.h1
                animate={{ y:-25 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                >
                .
                </motion.h1>
            </div>

            <Spinner animation="border" size="lg" variant="danger">
                <span className="visually-hidden">Logging out...</span>
            </Spinner>
        </div>
    );
};

async function logout(ChangeKey, nav){
    let key = window.localStorage.getItem('key');
    let response = await (await fetch(`${url()}/dj-rest-auth/logout/`,
    {
        headers: {
            "Authorization": `Token ${key}`
        },
        method: 'POST'
    }
    )).json();
    window.localStorage.removeItem('key');
    ChangeKey('')
    console.log(response);
    if (response.detail === 'Successfully logged out.'){
        return nav("/");    
    };
    alert('Seems something went wrong. We have done our best to log you out. If you are not loged out apon redirect, please reload, and try again later.');
    return nav("/");    
    
};