import {updateContext, tagContext} from './description';
import { createRef, useContext } from 'react';
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
    const tagsRef = createRef()

    const sendTags = () => {
        const tags = tagsRef.current.value;
        fetch(`${url()}/api/EditTags/${id}`, {
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('key')}`,
            },
            method: 'PUT',
            body: JSON.stringify({
                tag: tags
            })
            
        })
        forceupdate(update+1)
        return;
    }

    return (
        <>
            <div className='d-flex align-items-center mt-3'>
                <div className="input-group">
                    <input type="text" ref={tagsRef} defaultValue={tags} className="form-control rounded" placeholder="Add Tags" aria-label="AddTags" />
                    <motion.button
                    onClick={sendTags}
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