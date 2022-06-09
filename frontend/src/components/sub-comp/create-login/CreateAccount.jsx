import { motion } from 'framer-motion';
import { createRef, useContext, useState } from 'react';
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

    //create ref
    const username = createRef();
    const email = createRef();
    const password = createRef();
    const conpass = createRef();

    const createaccount = async () => {
        const usernameValue = username.current.value;
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
        const conpassValue = conpass.current.value;
        if(checkValidity(usernameValue, emailValue, passwordValue, conpassValue)){
            return;
        }
        await sendData(usernameValue, emailValue, passwordValue, conpassValue)
        return;
    }

    const checkValidity = (usernameValue, emailValue, passwordValue, conpassValue) => {
        if (usernameValue === '' || emailValue === '' || passwordValue === '' || conpassValue === ''){
            alert('All needed fields not filled.', alertstatus);
            return true;
        }else if (passwordValue !== conpassValue) {
            alert('Passwords must match.', alertstatus);
            return true;
        };  
    }

    const sendData = async (usernameValue, emailValue, passwordValue, conpassValue) => {
        let response = await (await fetch(`${url()}/dj-rest-auth/registration/`, { 
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: usernameValue,
                password1: passwordValue,
                password2: conpassValue,
                email: emailValue,
            })
        })).json();
        checkResponse(response)
        
    }

    const checkResponse = (response) => {
        let msg;
        switch (response) {
            case response.message:
                msg = String(response.message).replace(/,/gi,'<br/>');
                alert(msg);
                break;
            case response.email:
                msg = String(response.email).replace(/,/gi,'<br/>');
                alert(msg);
                break;
            case response.password1:
                msg = String(response.password1).replace(/,/gi,'<br/>');
                alert(msg);
                break;
            case response.non_field_errors:
                msg = String(response.non_field_errors).replace(/,/gi,'<br/>');
                alert(msg);
                break;
            case response.username:
                msg = String(response.username).replace(/,/gi,'<br/>');
                alert(msg);
                break;
            case response.key:
                window.localStorage.setItem('key', response.key);
                KeyContext(response.key)
                return nav("/storage");
            default:
                alert('Something went wrong, make sure your information is valid, and try again later.')
                break;
        }
    }

    return(
        <form>
            

            {/* user name */}
            <div className="form-group">
                <label htmlFor="username">User Name</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="text" className="form-control" ref={username} placeholder="User Name"/>
            </div>

            {/* email */}
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="email" className="form-control" ref={email} placeholder="Enter email"/>
            </div>

            {/* password */}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="password" className="form-control" ref={password} placeholder="Password"/>
            </div>

            {/* confirm password */}
            <div className="form-group"> 
                <label htmlFor="confirm password">Confirm Password</label>
                <motion.input whileFocus={{ scale: .98 }} autoComplete='off' type="password" className="form-control" ref={conpass} placeholder="Confirm Password"/>
                <small className="form-text text-muted">Passwords <strong>must</strong> match</small>
            </div>

            <div className='d-flex'>
                <motion.button 
                type="button" 
                className="btn btn-danger mt-3 align-self-center" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {createaccount()}}>
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