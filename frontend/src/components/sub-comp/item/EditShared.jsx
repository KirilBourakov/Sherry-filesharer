import { createRef, useContext, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import url from '../../utils/url';
import { shareContext, updateContext } from './description';


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

export default function EditShared(){
    const { id } = useParams();
    const update = useContext(updateContext)[0];
    const forceupdate = useContext(updateContext)[1];
    const pub = useContext(shareContext)[0];
    const shared = useContext(shareContext)[1];
    const [alertview, changeAlertView] = useState(false)
    const removeUserRef = createRef()
    const addUserRef = createRef()

    const changePrivate = async () => {
        let response = await (await (fetch(`${url()}/api/ChangePrivate/${id}`, {
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
        let response = await (await (fetch(`${url()}/api/RemoveUser/${id}`, {
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
        let response = await (await (fetch(`${url()}/api/addUser/${id}`, {
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
        return;
    }

    const alertError = (msg) => {
        document.getElementById('alert').innerHTML = msg
        changeAlertView(true);
        setTimeout(() => { changeAlertView(false); }, 2000);
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
                className="btn btn-danger ms-2">
                    Make Private
                </motion.button>
            </div>
        )
    } else{
        return(
            <>
            <div className='d-flex flex-column align-items-start mt-3 mb-1'>
                <motion.button 
                onClick={changePrivate}
                whileHover={'HoverDelete'}
                variants={variants} 
                className="btn btn-outline-danger mb-1 me-1">
                    Make Public
                </motion.button>

                {/* remove user */}
                <hr className='subdescription align-self-center'/>
                <div className="row">
                    <div className="col-4 pe-0">
                        <motion.button 
                        onClick={() => {removeUser(id, changeAlertView); forceupdate(update+1);}}
                        whileHover={'HoverDelete'}
                        variants={variants} 
                        className="btn btn-outline-danger mb-1">
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
                        onClick={() => {addUser(id, changeAlertView); forceupdate(update+1);}}
                        whileHover={'HoverDelete'}
                        variants={variants} 
                        className="btn btn-outline-danger mb-1">
                            Add user
                        </motion.button>
                    </div>
                    <div className="col-8 ps-0 pe-1">
                        <div className="input-group mb-3">
                            <input type='text' ref={addUserRef} className="form-control" placeholder='Name or user id'></input>
                        </div>
                    </div>
                    <small className="form-text text-muted m-0">Use a # if adding by id</small>
                </div>
            </div>

            <motion.div 
            animate={alertview ? "open" : "closed"}
            variants={variants}
            className="alert alert-danger"
            id='alert' 
            role="alert">
                
            </motion.div>
            </>
        )
        
    };
    
};
