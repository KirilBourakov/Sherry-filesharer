import { motion } from 'framer-motion';
import{ Link, useNavigate } from 'react-router-dom';
import { createRef, useContext, useState } from 'react';
import { UseKeyHook } from '../../../App';
import AlertDanger from '../../AlertDanger';


const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
};

export default function LoginForm(){
    const [alertView, changeAlertView] = useState(false);
    const [AlertText, setAlertText] = useState('')
    const KeyContext = useContext(UseKeyHook);
    const nav = useNavigate();
    
    const usernameRef = createRef()
    const passwordRef = createRef()

    const login = async () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        
        if (username === '' || password === '') {
            alert('Not all fields are filled.')
            return
        }

        const response = await sendLoginData(username, password)
        if(!checkResponse(response)){
            alert(response.non_field_errors)
            return;
        }

        window.localStorage.setItem('key', response.key);
        KeyContext(response.key)
        return nav("/storage"); 
    }

    const sendLoginData = async (username, password) => {
        let response = await (await fetch(`dj-rest-auth/login/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: '',
                password: password
    
            })
        })).json();
        return response
    }

    const checkResponse = (response) => {
        if (!response.key) {
            return false
        }
        return true
    }
    
    const alert = (text) => {
        setAlertText(text)
        changeAlertView(true);
        setTimeout(() => { 
            changeAlertView(false);
        }, 3000);
    }

    return(
        <form>
            
            {/* user name/ email */}
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input autoComplete='off' type="text" className="form-control" ref={usernameRef} placeholder="Username/Email"/>
            </div>

            {/* password */}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input autoComplete='off' type="password" className="form-control" ref={passwordRef} placeholder="Password"/>
            </div>

            <div className='d-flex'>
                <motion.button 
                type="button" 
                className="btn btn-danger mt-3 align-self-center" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={login}>
                    Login
                </motion.button>

                <Link to={'/create-account'} className='ms-auto align-self-center'>Don't have an account?</Link>
            </div> 
            <AlertDanger 
                text={AlertText} 
                see={alertView}
                animate={{ opacity: 1, x: 0}}
                change={{ opacity: 0, x: "-100%" }}
            />
        </form>
    );
}