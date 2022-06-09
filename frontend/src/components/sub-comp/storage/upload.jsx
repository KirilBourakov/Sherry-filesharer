import Form from 'react-bootstrap/Form'
import { motion } from 'framer-motion'
import url from './../../utils/url';
import { useState } from 'react';

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

    const uploadFile = async (e) => {
        if (await checkFormData()){
            if (!window.confirm('This file apears to exist. If you continue, it will be overwritten')){
                return false;
            }
        }
        await sendFileData();
        await sendFormData();
        props.updateView()
        return
    }

    const checkFormData = async () => {
        const filename = document.getElementById('upload').files[0].name
        let response = await(await fetch(`${url()}/api/checkFormData`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                filename: filename,
            })
        })).json();
        return response.exists
    }

    const sendFileData = async () => {
        let key = window.localStorage.getItem('key'); 
        let formData = new FormData(); //make form
        var input = document.getElementById('upload').files[0]; //get file
        formData.append('file', input, input.name); //attach file to form
        let response = await(await fetch(`${url()}/api/sendFileData`, {
            headers: {
                "Authorization": `Token ${key}`,
            },
            method: 'POST',
            body: formData
        })).json();
       
    }

    const sendFormData = async () => {
        let tags = document.getElementById('tags').value;
        let response = await(await fetch(`${url()}/api/sendFormData`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'POST',
            body: JSON.stringify({
            })
        })).json();
        return
    }


    return(
        <div className='d-flex flex-column'>
            <form id="form" enctype="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Label>Upload</Form.Label>
                    <motion.div
                    whileHover={'hoverform'}
                    whileTap={'tapform'}
                    variants={variants}
                    >
                    <Form.Control type="file" size="lg" id="upload" name="static_file"/>
                    </motion.div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tags <small className="form-text">seperete tags with a space</small></Form.Label>
                    <motion.div
                    whileHover={'hoverform'}
                    whileTap={'tapform'}
                    variants={variants}
                    >
                        <Form.Control type="text" size="lg" id="tags"/>
                    </motion.div>
                </Form.Group>
                <motion.button 
                type='submit'
                className='btn btn-danger'
                variants={variants}
                whileHover='HoverSubmitFile'
                onClick={(e) => {uploadFile(e)}}
                >
                Upload
                </motion.button>
            </form>

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

// async function uploadfile(changefunc, changefunc2, forceupdate, update) {
//     let key = window.localStorage.getItem('key'); 
//     let formData = new FormData(); //make form
//     var input = document.getElementById('upload').files[0]; //get file
//     formData.append('file', input, input.name); //attach file to form


    
//      //send file


//     // 


//     // try {
//     //     var input = document.getElementById('upload').files[0];
//     //     formData.append('file', input, input.name);
//     //     let check = input.name;
//     // } catch (error) {
//     //     makeerror(changefunc);
//     //     return;
//     // };
//     if (response.status === true) {
//         //renamefile(input.name, response.pk, response.oldfilename, changefunc, changefunc2, forceupdate, update);
//         return;
//     } else{
//         makeerror(changefunc)
//     };
    
// };

// async function renamefile(filename, pk, oldfilename, changefunc, changefunc2, forceupdate, update) {
//     if (await checkoverlap(filename, oldfilename)){
//         return;
//     }
//     let tags = document.getElementById('tags').value;
//     let response = await(await fetch(`${url()}/api/rename`, {
//         headers: {
//             "Authorization": `Token ${window.localStorage.getItem('key')}`,
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             filename: filename,
//             tags: tags,
//             pk: pk,
//             oldfilename: oldfilename
//         })
//     })).json();

//     if (response.status === true) {
//         if (response.msg === true){
//             sucess(changefunc2, forceupdate, update)
//         } else{
//             sucess(changefunc2, forceupdate, update, response.msg)
//         }
        
//         return;
//     } else{
//         makeerror(changefunc, response.status);
//     };

//     return;
// };

// async function checkoverlap(filename, oldfilename) {
//     let response = await(await fetch(`${url()}/api/checkFileExistance`, {
//         headers: {
//             "Authorization": `Token ${window.localStorage.getItem('key')}`,
//         },
//         method: 'PUT',
//         body: JSON.stringify({
//             filename: filename,
//             oldfilename: oldfilename
//         })
//     })).json();
//     if (response.exists === true){
//         if(window.confirm('This file apears to exist. If you continue, it will be overwritten')){
//             return false;
//         } else{
//             await(await fetch(`${url()}/api/DeleteTemp`, {
//                 headers: {
//                     "Authorization": `Token ${window.localStorage.getItem('key')}`,
//                 },
//                 method: 'POST',
//                 body: JSON.stringify({
//                     oldfilename: oldfilename
//                 })
//             })).json();
//             return true;
//         }
//     }
//     return false
// }

// function makeerror(changefunc, msg='Sorry, something went wrong. Please try again later, and make sure the file field is not empty.') {
//     document.getElementById('error').innerHTML = msg
//     changefunc(true);
//     setTimeout(() => {  changefunc(false); }, 5000);
//     return;   
// };

// function sucess(changefunc, forceupdate, update, msg="File uploaded successfully.") {
//     document.getElementById('sucess').innerHTML = msg
//     changefunc(true);
//     forceupdate(update+1);
//     clear();
//     setTimeout(() => { changefunc(false); }, 5000);
//     return;   
// };

// function clear() {
//     document.getElementById('upload').value = '';
//     document.getElementById('tags').value = '';
//     return;
// };