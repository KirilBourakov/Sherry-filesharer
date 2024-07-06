import { motion } from 'framer-motion'
import { UseKeyHook } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export default function Logout(){
    const ChangeKey = useContext(UseKeyHook)
    const nav = useNavigate();
    const Effect = useEffect(() => {
        logout();
    }, [])
    
    const logout = async () => {
        let response = await (await fetch(`dj-rest-auth/logout/`,
        {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`
            },
            method: 'POST'
        }
        )).json();
        window.localStorage.removeItem('key');
        ChangeKey('')
        return nav("/");    
    }

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

            <div animation="border" size="lg" variant="danger">
                <span className="visually-hidden">Logging out...</span>
            </div>
        </div>
    );
};