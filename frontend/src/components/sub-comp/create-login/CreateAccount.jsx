import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import{ Link, useNavigate } from 'react-router-dom';
import url from './../../utils/url';
import { UseKeyHook } from '../../../App';

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
};

export default function CreateAccount() {
    const [alert, alertstatus] = useState(false);
    const nav = useNavigate()
    const KeyContext = useContext(UseKeyHook)
    return(
        <form>
            

            {/* user name */}
            <div className="form-group">
                <label htmlFor="username">User Name</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="text" className="form-control" id="username" placeholder="User Name"/>
            </div>

            {/* email */}
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="email" className="form-control" id="email" placeholder="Enter email"/>
            </div>

            {/* password */}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="password" className="form-control" id="password" placeholder="Password"/>
            </div>

            {/* confirm password */}
            <div className="form-group"> 
                <label htmlFor="confirm password">Confirm Password</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password"/>
                <small className="form-text text-muted">Passwords <strong>must</strong> match</small>
            </div>

            <div className='d-flex'>
                <motion.button 
                type="button" 
                className="btn btn-danger mt-3 align-self-center" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {createaccount(alertstatus, nav, KeyContext)}}>
                    Create account
                </motion.button>

                <Link to={'/login'} className='ms-auto align-self-center link'>Already have an account?</Link>
            </div>    

            <motion.div 
            animate={alert ? "open" : "closed"}
            variants={variants}
            id="probalert"
            className="alert alert-danger mt-4" role="alert">
                
            </motion.div>
        </form>
        
    );
};

async function createaccount(changefunc, nav, KeyContext) {
    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let conpass = document.getElementById('confirmpassword').value;
    // check value of passwords
    if (password === '' || name === ''){
        alert('All needed fields not filled.', changefunc);
        return;
    }else if (password !== conpass) {
        alert('Passwords must match.', changefunc);
        return;
    };  
    let response = await (await fetch(`${url()}/dj-rest-auth/registration/`, { 
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username: name,
            password1: password,
            password2: conpass,
            email: email,
            

        })
    })).json();
    if (response.message){
        alert(response.message, changefunc);
        return;
    } if(response.email){
        let msg = String(response.email).replace(/,/gi,'<br/>');
        alert(msg, changefunc);
        return;
    } if (response.password1){
        let msg = String(response.password1).replace(/,/gi,'<br/>');
        alert(msg, changefunc);
        return;
    } if (response.non_field_errors){
        let msg = String(response.non_field_errors).replace(/,/gi,'<br/>');
        alert(msg, changefunc);
        return;
    } if (response.username){
        let msg = String(response.username).replace(/,/gi,'<br/>');
        alert(msg, changefunc);
        return;
    } if(response.key){
        window.localStorage.setItem('key', response.key);
        KeyContext(response.key)
        return nav("/storage"); 
    }
    
};

function alert(text, changefunc){
    document.getElementById('probalert').innerHTML = text;
    changefunc(true);
};