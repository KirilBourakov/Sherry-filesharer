import { useState } from "react";
import { motion } from 'framer-motion';
import { MdOutlinePictureAsPdf, MdOutlineImage, MdOutlineInsertDriveFile  } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
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
                    {Icon(props.filename)}
                </div>
                <h4 className="align-self-center ms-auto mb-0">{props.filename}</h4>
            </motion.div>
    );
};

function Icon(filename){
    let extension = filename.split('.')
    extension = extension[extension.length - 1].toLowerCase()
    
    const images = ['apng', 'png', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'svg', 'webp', 'bmp', 'ico', 'cur', 'tif', 'tiff']
    if (images.includes(extension)){
        return <MdOutlineImage size={30}/>
    }
    const text = ['txt']
    if (text.includes(extension)){
        return <AiOutlineFileText size={30} />
    }

    if (extension === 'pdf'){
        return <MdOutlinePictureAsPdf size={30}/>
    }

    return <MdOutlineInsertDriveFile size={30}/>
}