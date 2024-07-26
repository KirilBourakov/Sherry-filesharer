import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { images, text, pdf } from '../../scripts/fileExtensions'
import { motion } from 'framer-motion';
import { getToken } from '../../scripts/authentication';
import Description from './description';

export default function Preview(props){
    let location = useLocation();
    const extension = location.state.extension

    // use effect to get file info

    // add support for video, and other file types
    return(
        <motion.div 
        initial={{ opacity:0 }}
        whileInView={{ opacity:1  }}
        viewport={{ once: true }}
        className="container">
            <div className="row">
                <div className="col-12 col-md-8 mt-3">
                    <FilePreview extension={extension}/>
                </div>
                <div className="col-12 col-md-4 mt-3">
                    <Description />
                </div>
            </div>
        </motion.div>
    );
}

function FilePreview({extension}){
    const { id } = useParams();
    const [fileURL, setFileURL] = useState(null)
    useEffect(() => {
        console.log('adsad')
        const getFile = async () => {
            let response = await fetch(`/storage/file?file=${id}`, {
                headers: {
                    "Authorization": `Token ${getToken().token}`,
                }
            })
            
            response = await response.blob()
            setFileURL(URL.createObjectURL(response))
        }
        getFile()
    }, [])
    return (
        <iframe src={fileURL} className='pdf'> </iframe>
    )
}