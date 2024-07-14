import { motion } from 'framer-motion'
import { createRef, useState } from 'react';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';
import { getToken } from '../../scripts/authentication';

const variants = {
    HoverSubmitFile:{
        scale: 1.1,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse', 
            duration: .3
        }
    },
    hoverform:{
        scale: 1.02,
        transition: {
            duration: .3
        }
    },
    tapform:{
        scale: .98,
        transition: {
            duration: .3
        }
    }
         
};

export default function Upload(props){
    const [successview, changesuccessview] = useState(false);
    const fileRef = createRef();
    const tagRef = createRef();

    // alert error state
    const [errorView, setErrorView] = useState(false);
    const [errorText, setErrorText] = useState('')

    //alert success state
    const [successView, setSuccessView] = useState(false);
    const [successText, setSuccessText] = useState('')

    
    // alert user about upload status
    const alertSuccess = (text) => {
        setSuccessText(text)
        setSuccessView(true);
        setTimeout(() => { setSuccessView(false); }, 5000);
        return
    } 

    const uploadFile = async (e) => {
        e.preventDefault()

        const response = await fetch('/storage/upload', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${getToken().token}`,
            },
            method: 'POST',
        })
        console.log(response.status)
    }

    const alertError = (text) => {
        setErrorText(text)
        setErrorView(true);
        setTimeout(() => { setErrorView(false); }, 5000);
        return
    } 

    return(
        <div className='d-flex flex-column'>
            <form>
                <div className="mb-3">
                    <label>Upload</label>
                    <motion.div
                    whileHover={'hoverform'}
                    whileTap={'tapform'}
                    variants={variants}
                    >
                    <input type="file" size="lg" ref={fileRef}/>
                    </motion.div>
                </div>
                <div className="mb-3">
                    <label>Tags <small className="form-text">seperete tags with a space</small></label>
                    <motion.div
                    whileHover={'hoverform'}
                    whileTap={'tapform'}
                    variants={variants}
                    >
                        <input type="text" size="lg" ref={tagRef} />
                    </motion.div>
                </div>
                <motion.button 
                type='button'
                className='btn btn-primary'
                variants={variants}
                whileHover='HoverSubmitFile'
                onClick={(e) => {uploadFile(e)}}
                >
                Upload
                </motion.button>
            </form>

            <AlertDanger 
                text={errorText} 
                see={errorView}
                animate={{ opacity: 1, x: 0, hight:"100%" }}
                change={{ opacity: 0, x: "-100%", hight:'0px'}}
            />

            <AlertSuccess 
                text={successText} 
                see={successView}
                animate={{ opacity: 1, x: 0, hight:"100%" }}
                change={{ opacity: 0, x: "-100%", hight:'0px'}}
            />

        </div>
    );
};