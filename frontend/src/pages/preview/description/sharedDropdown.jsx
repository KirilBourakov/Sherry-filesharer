import { createRef, useContext, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { shareContext, updateContext } from '.';
import AlertDanger from "../../../components/AlertDanger";
import AlertSuccess from '../../../components/AlertSuccess'

const variants = {
    HoverButton:{
        scale: 1.06,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse', 
            duration: .3
        }
    },
    open: { opacity: 1, y:0 },
    closed: { opacity: 0, y:'30px' },
};

export default function SharedDropdown(props){
    const { id } = useParams();
    const update = null
    const forceupdate = null
    const pub = props.public
    const shared = props.shared

    //error state
    const [errorView, setErrorView] = useState(false)
    const [errorText, setErrorText] = useState('')

    //success state
    const [successView, setSuccessView] = useState(false)
    const [successText, setSuccessText] = useState('')

    //ref
    const removeUserRef = createRef()
    const addUserRef = createRef()

    const changePrivate = async () => {
        let response = await (await (fetch(`api/ChangePrivate/${id}`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                bool: !pub
            })
            
        }))).json();
    
        if (response.response !== true) {
            alertError(response.response)
            return;
        }
        updateView()
        return;
    }

    const removeUser = async () => {
        const user = removeUserRef.current.value
        let response = await (await (fetch(`api/RemoveUser/${id}`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                user: user
                
            })
        }))).json();
        if (response.response !== true) {
            alertError(response.response)
            return;
        }
        updateView()
        return;
    }

    const addUser = async () => {
        let user =  addUserRef.current.value
        let response = await (await (fetch(`api/addUser/${id}`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                user: user
                
            })
        }))).json();
        if (response.response !== true) {
            alertError(response.response)
            return;
        }
        alertSuccess('User added')
        updateView()
        return;
    }

    const alertError = (msg) => {
        setErrorText(msg)
        setErrorView(true);
        setTimeout(() => { setErrorView(false); }, 2000);
    }

    const alertSuccess = (msg) => {
        setSuccessText(msg)
        setSuccessView(true);
        setTimeout(() => { setSuccessView(false); }, 2000);
    }

    const updateView = () => {
        forceupdate(update+1)
        return;
    }

    if (pub){
        return(
            <div className='d-flex align-items-start mt-3'>
                <h3 className="me-2">Currently Public</h3>
                <motion.button 
                onClick={changePrivate}
                whileHover={'HoverDelete'}
                variants={variants} 
                className="btn btn-primary ms-2">
                    Make Private
                </motion.button>
            </div>
        )
    } else{
        return(
            <>
            <div className='d-flex flex-column align-items-start mt-3 mb-1'>
            
                {/* remove user */}
                <hr className='subdescription align-self-center'/>
                <div className="row">
                    <div className="col-4 pe-0">
                        <motion.button 
                        onClick={removeUser}
                        whileHover={'HoverDelete'}
                        variants={variants} 
                        className="btn btn-outline-primary mb-1">
                            Remove User
                        </motion.button>
                    </div>
                    <div className="col-8">
                        <select className="select" ref={removeUserRef}>
                            <option defaultValue>Remove User From Shared With</option>
                            
                            {shared &&
                                shared.map((user) => {
                                return(
                                    <option key={user} value={user}>{user}</option>
                                )
                            })
                            
                            }
                            
                        </select>
                    </div>
                </div>

                {/* add user */}
                <hr className='subdescription align-self-center'/>
                <div className="row">
                    <div className="col-4 pe-0">
                        <motion.button 
                        onClick={addUser}
                        whileHover={'HoverDelete'}
                        variants={variants} 
                        className="btn btn-outline-primary mb-1">
                            Add user
                        </motion.button>
                    </div>
                    <div className="col-8 ps-0 pe-1">
                        <div className="input-group">
                            <input type='text' ref={addUserRef} className="form-control" placeholder='Name or user id'></input>
                        </div>
                    </div>
                    <small className="form-text text-muted mb-3">Use a # if adding by id</small>
                </div>

                <motion.button 
                onClick={changePrivate}
                whileHover={'HoverDelete'}
                variants={variants} 
                className="btn btn-outline-primary mb-1 me-1">
                    Make Public
                </motion.button>
            </div>

                <AlertDanger 
                    text={errorText} 
                    see={errorView}
                    animate={{ opacity: 1, y:0 }}
                    change={{ opacity: 0, y:'30px' }}
                />
                <AlertSuccess
                    text={successText}
                    see={successView}
                    animate={{ opacity: 1, y:0 }}
                    change={{ opacity: 0, y:'30px' }}
                />
            </>
        )
        
    };
    
};
