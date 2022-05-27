import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateContext } from './description';
import url from "../../utils/url";

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

export default function Delete(){
    const update = useContext(updateContext)[0]; 
    const forceupdate = useContext(updateContext)[1];
    const { id } = useParams();
    const nav = useNavigate();
    return(
        <>
            <motion.button 
                onClick={() => {remove(id, nav); forceupdate(update+1);}}
                whileHover={'HoverDelete'}
                variants={variants} 
                className="btn btn-danger ms-2 mb-1">
                    <strong>Delete file</strong>
            </motion.button>

        </>
    );
};

async function remove(id, nav) {
    if(!window.confirm('This Action is irreversible, are you sure you wish to proceed?')){
        return;
    }
    let response = await (await (fetch(`${url()}/api/deleteFile/${id}`, {
        headers: {
            "Authorization": `Token ${window.localStorage.getItem('key')}`,
        },
        method: 'POST',
    }))).json();

    if (response.response !== true) {
        alert(response.response)
        return;
    }
    alert('File Deleted')
    nav("/storage");
    return;
}

