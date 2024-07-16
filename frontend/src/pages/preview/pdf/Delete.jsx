import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateContext } from './description';

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

    const remove = async () => {
        if(!window.confirm('This Action is irreversible, are you sure you wish to proceed?')){
            return;
        }
        const response = await (await (fetch(`api/deleteFile/${id}`, {
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
        forceupdate(update+1);
        return;
    }

    return(
        <>
            <motion.button 
                onClick={remove}
                whileHover={'HoverDelete'}
                variants={variants} 
                className="btn btn-danger ms-2 mb-1">
                    <strong>Delete file</strong>
            </motion.button>

        </>
    );
};

