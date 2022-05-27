import {updateContext, tagContext} from './description';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import url from '../../utils/url';
import { useParams } from 'react-router-dom';


const variants = {
    HoverDelete:{
        scale: 1.06,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse', 
            duration: .3
        }
    }
};

export default function EditTags(){
    const update = useContext(updateContext)[0];
    const forceupdate = useContext(updateContext)[1];
    const tags = useContext(tagContext);
    const { id } = useParams();
    return (
        <>
            <div className='d-flex align-items-center mt-3'>
                <div className="input-group">
                    <input type="text" id="AddTags" defaultValue={tags} className="form-control rounded" placeholder="Add Tags" aria-label="AddTags" />
                    <motion.button
                    onClick={() => {sendtag(id); forceupdate(update+1);}}
                    whileHover={'HoverDelete'}
                    variants={variants} 
                    className="btn btn-danger ms-2 rounded">
                        Edit
                    </motion.button>
                </div>
            </div>
            <small className="form-text text-muted">Remember to use spaces between your tags</small>
        </>
    );
};
async function sendtag(id){
    let tags = document.getElementById('AddTags').value;
    let response = await (await (fetch(`${url()}/api/EditTags/${id}`, {
        headers: {
            "Authorization": `Token ${window.localStorage.getItem('key')}`,
        },
        method: 'PUT',
        body: JSON.stringify({
            tag: tags
        })
        
    }))).json()

    return;
};

