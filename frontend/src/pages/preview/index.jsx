import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { images, text, pdf } from '../../scripts/fileExtensions'
import { motion } from 'framer-motion';
import Description from './description';
import FileNotAccessible from '../../components/fileNotAccessible'
import { AuthContext } from '../../components/providers/authProvider';

export default function Preview(props){
    let location = useLocation();
    const extension = location.state ? location.state.extension : null
    const [fileAccessibleCode, setFileAccessibleCode] = useState(200)

    if (fileAccessibleCode !== 200){
        return <FileNotAccessible error={fileAccessibleCode}/>
    }

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
                    <FilePreview extension={extension} setFileAccessibleCode={setFileAccessibleCode}/>
                </div>
                <div className="col-12 col-md-4 mt-3">
                    <Description setFileAccessibleCode={setFileAccessibleCode}/>
                </div>
            </div>
        </motion.div>
    );
}

function FilePreview({extension, setFileAccessibleCode}){
    const { id } = useParams();
    const [fileURL, setFileURL] = useState(null)
    const { authObj, setAuthObj } = useContext(AuthContext)

    useEffect(() => {
        const getFile = async () => {
            let response = await fetch(`/storage/file?file=${id}`, {
                headers: {
                    "Authorization": `Token ${authObj.token}`,
                }
            })
            if (response.status !== 200){
                setFileAccessibleCode(false)
                return
            }
            
            response = await response.blob()
            setFileURL(URL.createObjectURL(response))
        }
        getFile()
    }, [])
    return (
        <iframe src={fileURL} className='pdf'> </iframe>
    )
}