import { motion } from "framer-motion";
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from "react";
import Content from './contents';
import Upload from './upload';
import Search from '../../components/multi/search';
import New from './new'
import CreateDirectory from "./createDirectory";
import { getToken } from "../../scripts/authentication";

export default function Main(){
    const [update, forceupdate] = useState(0);
    const [search, changesearch ]= useState('|<>|');
    const [showUpload, changeShowUpload] = useState(false)
    const [showNewDirectory, changeShowNewDirectory] = useState(false)

    let path = useParams()['*']
    if (path === undefined){
        path = '/'
    } else {
        path = '/' + path
    }
    const updateView = () => {
        forceupdate(update + 1)
        return
    }

    const uploadPopup = () => {
        if (showNewDirectory) changeShowNewDirectory(false)
        changeShowUpload(!showUpload)
        
    }
    const directoryPopup = () => {
        if (showUpload) changeShowUpload(false)
        changeShowNewDirectory(!showNewDirectory) 
    }

    return(
        <>
            <motion.div
            initial={{ opacity:0 }}
            whileInView={{ opacity:1  }}
            viewport={{ once: true }}>
                <div>
                    <div className="container">
                        <div className="row mt-3">
                            <Search changesearch={changesearch} />
                        </div>
                        <div className="row mt-3">
                            <Content update={update} params={search} directory={path} forceupdate={updateView}/>
                        </div>
                    </div>
                    {showUpload &&
                        <Upload update={updateView} directory={path} show={uploadPopup}/>
                    }
                    {showNewDirectory &&
                        <CreateDirectory update={updateView} directory={path} show={directoryPopup}/>
                    }
                </div>
            </motion.div>
            <New uploadPopup={uploadPopup} directoryPopup={directoryPopup}/>
        </>
    );
};

