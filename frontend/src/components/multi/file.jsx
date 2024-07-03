import { useState } from "react";
import { motion } from 'framer-motion';
import {MdOutlinePictureAsPdf} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const variants = {
    HoverFile:{
        scale: 1.02,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse', 
            duration: .3
        }
    }
}


export default function File(props){
    const [filename, changefilename] = useState(props.content.split('/')[props.content.split('/').length-1].replaceAll('%20', ' '));
    const nav = useNavigate()

    const gotofile = () => {
        return nav(`/item/${props.fileid}`);
    }


    return(
            <motion.div 
            whileHover={'HoverFile'}
            variants={variants}
            className="border border-dark rounded p-1 d-flex" 
            onClick={gotofile} >
                <div className="align-self-center">
                    <MdOutlinePictureAsPdf size={30}/>
                </div>
                <h4 className="align-self-center ms-auto mb-0">{filename}</h4>
            </motion.div>
    );
};
