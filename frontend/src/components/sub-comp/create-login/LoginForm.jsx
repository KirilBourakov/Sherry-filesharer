import { motion } from 'framer-motion';
import{ Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UseKeyHook } from '../../../App';
import url from './../../utils/url';

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
};

export default function LoginForm(){
    const [alert, alertstatus] = useState(false);
    const nav = useNavigate()
    const KeyContext = useContext(UseKeyHook)
    return(
        <form>
            
            {/* user name/ email */}
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="text" className="form-control" id="username" placeholder="Username/Email"/>
            </div>

            {/* password */}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="password" className="form-control" id="password" placeholder="Password"/>
            </div>

            <div className='d-flex'>
                <motion.button 
                type="button" 
                className="btn btn-danger mt-3 align-self-center" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {login(alertstatus, nav, KeyContext)}}>
                    Login
                </motion.button>

                <Link to={'/create-account'} className='ms-auto align-self-center'>Don't have an account?</Link>
            </div> 
            
            <motion.div 
            animate={alert ? "open" : "closed"}
            variants={variants}
            id="probalert"
            className="alert alert-danger mt-4" role="alert">
                
            </motion.div>

        </form>
    );
}

async function login(changefunc, nav, KeyContext) {
    let name = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = '';
    let response = await (await fetch(`${url()}/dj-rest-auth/login/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username: name,
            email: email,
            password: password

        })
    })).json();
    if (response.non_field_errors){
        let msg = String(response.non_field_errors).replace(/,/gi,'<br/>');
        alert(msg, changefunc);
        return;
    } if(response.key){
        window.localStorage.setItem('key', response.key);
        KeyContext(response.key)
        return nav("/storage"); 
    }
}

function alert(text, changefunc){
    document.getElementById('probalert').innerHTML = text
    changefunc(true);
    setTimeout(() => { 
        changefunc(false);
        setTimeout(() => {
            alert.classList = 'mt-2 alert';
        }, 1000);
    }, 3000);
};