import Form from 'react-bootstrap/Form'
import { motion } from 'framer-motion'
import url from './../../utils/url';
import { createRef, useState } from 'react';

const variants = {
    HoverSubmitFile:{
        scale: 1.1,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse', 
            duration: .3
        }
    },
    open: { opacity: 1, x: 0, hight:"100%" },
    closed: { opacity: 0, x: "-100%", hight:'0px'},
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
    const [errorview, changeerrorview] = useState(false);
    const [successview, changesuccessview] = useState(false);
    const fileRef = createRef();
    const tagRef = createRef();

    const uploadFile = async (e) => {
        const file = fileRef.current
        const tags = tagRef.current
        if (await checkFormData(file)){
            if (!window.confirm('This file apears to exist. If you continue, it will be overwritten')){
                file.value = ''
                tags.value = ''
                return;
            }
        }
        const response = await sendFileData(file);
        const confirm = await sendFormData(tags, response, file);
        alert(confirm)
        file.value = ''
        tags.value = ''
        props.update()
        return
    }

    //Check validity of formData
    const checkFormData = async (file) => {
        const filename = file.files[0].name
        let response = await(await fetch(`${url()}/api/checkFormData`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                filename: filename,
            })
        })).json();
        if (response.exists === true) {
            return true
        } else if (response.status !== 'clear'){
            window.alert('Please make sure the file is a pdf')
        }
        return false
    }

    // send raw file bytes
    const sendFileData = async (file) => {
        let formData = new FormData(); //make form
        formData.append('file', file.files[0], file.files[0].name); //attach file to form
        let response = await(await fetch(`${url()}/api/sendFileData`, {
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
        let response = await(await fetch(`${url()}/api/sendFormData`, {
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
        alert(response.msg)
        return response.status
    }

    // alert user about upload status
    const alert = (success) => {
        if (success) {
            changesuccessview(true);
            setTimeout(() => { changesuccessview(false); }, 5000);
            return
        }
        changeerrorview(true);
        setTimeout(() => { changeerrorview(false); }, 5000);
        return
    } 

    return(
        <div className='d-flex flex-column'>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Upload</Form.Label>
                    <motion.div
                    whileHover={'hoverform'}
                    whileTap={'tapform'}
                    variants={variants}
                    >
                    <Form.Control type="file" size="lg" ref={fileRef}/>
                    </motion.div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tags <small className="form-text">seperete tags with a space</small></Form.Label>
                    <motion.div
                    whileHover={'hoverform'}
                    whileTap={'tapform'}
                    variants={variants}
                    >
                        <Form.Control type="text" size="lg" ref={tagRef} />
                    </motion.div>
                </Form.Group>
                <motion.button 
                type='button'
                className='btn btn-danger'
                variants={variants}
                whileHover='HoverSubmitFile'
                onClick={(e) => {uploadFile(e)}}
                >
                Upload
                </motion.button>
            </Form>

            <div className='abs'>
                <motion.div 
                animate={errorview ? "open" : "closed"}
                variants={variants}
                id='error'
                className="alert alert-danger mt-3 rel" 
                role="alert">
                    Sorry, something went wrong. Please try again later, and make sure the file field is not empty.
                </motion.div>
                <motion.div 
                animate={successview ? "open" : "closed"}
                variants={variants}
                id='sucess'
                className="alert alert-success mt-3" 
                role="alert">
                    File uploaded successfully.
                </motion.div>
            </div>
        </div>
    );
};