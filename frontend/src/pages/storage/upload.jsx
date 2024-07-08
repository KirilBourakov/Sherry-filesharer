import { motion } from 'framer-motion'
import { createRef, useState } from 'react';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

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

    const uploadFile = async (e) => {
        const file = fileRef.current
        const tags = tagRef.current
        const check = await checkFormData(file)
        if (check.exists === false){
            if (!window.confirm('This file apears to exist. If you continue, it will be overwritten')){
                file.value = ''
                tags.value = ''
                return;
            }
        }
        if (check.status) {
            alertError(check.status)
            return;
        }
        const response = await sendFileData(file);
        const confirm = await sendFormData(tags, response, file);
        alertSuccess(confirm)
        file.value = ''
        tags.value = ''
        props.update()
        return
    }

    //Check validity of formData
    const checkFormData = async (file) => {
        const filename = file.files[0].name
        let response = await(await fetch(`api/checkFormData`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                filename: filename,
            })
        })).json();
        return response
    }

    // send raw file bytes
    const sendFileData = async (file) => {
        let formData = new FormData(); //make form
        formData.append('file', file.files[0], file.files[0].name); //attach file to form
        let response = await(await fetch(`api/sendFileData`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'POST',
            body: formData
        })).json();
       return response
    }

    // send tags and filename
    const sendFormData = async (tags, oldFileData, file) => {
        
        let tagsValue = tags.value;
        let response = await(await fetch(`api/sendFormData`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'POST',
            body: JSON.stringify({
                tags: tagsValue,
                filename: file.files[0].name,
                pk: oldFileData.pk,
                TempName: oldFileData.temp_name
            })
        })).json();
        return response.msg
    }

    // alert user about upload status
    const alertSuccess = (text) => {
        setSuccessText(text)
        setSuccessView(true);
        setTimeout(() => { setSuccessView(false); }, 5000);
        return
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
                className='btn btn-danger'
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