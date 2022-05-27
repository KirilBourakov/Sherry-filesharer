import { useContext, useState } from "react";
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

    if (pub){
        return(
            <div className='d-flex align-items-start mt-3'>
                <h3 className="me-2">Currently Public</h3>
                <motion.button 
                onClick={() => {makePrivate(id, !pub); forceupdate(update+1);}}
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
                onClick={() => {makePrivate(id, !pub, changeAlertView); forceupdate(update+1);}}
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
                        <select className="select" id="removeUser">
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
                            <input type='text' id="addUser" className="form-control" placeholder='Name or user id'></input>
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

async function makePrivate(id, bool, changefunc) {
    let response = await (await (fetch(`${url()}/api/ChangePrivate/${id}`, {
        headers: {
            "Authorization": `Token ${window.localStorage.getItem('key')}`,
        },
        method: 'PUT',
        body: JSON.stringify({
            bool: bool
        })
        
    }))).json();

    if (response.response !== true) {
        alertError(response.response, changefunc)
        return;
    }
    return;
};

async function removeUser(id, changefunc) {
    let user =  document.getElementById('removeUser').value
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
        alertError(response.response, changefunc)
        return;
    }
    return;
}

async function addUser(id, changefunc) {
    let user =  document.getElementById('addUser').value
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
        alertError(response.response, changefunc)
        return;
    }
    return;
}

function alertError(msg, changefunc) {
    document.getElementById('alert').innerHTML = msg
    changefunc(true);
    setTimeout(() => { changefunc(false); }, 2000);
}