import { motion } from "framer-motion";
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from "react";
import Content from './contents';
import Upload from './upload';
import localSearch from './localSearch'
import New from './new'
import CreateDirectory from "./createDirectory";
import { getToken } from "../../scripts/authentication";
import { useLocation } from 'react-router-dom';
import { checkLoginAndRedirect } from "../../scripts/authentication";
import { useNavigate } from "react-router-dom";

export default function Main(){
    const [update, forceupdate] = useState(0);
    const [search, changesearch ]= useState('|<>|');
    const [showUpload, changeShowUpload] = useState(false)
    const [showNewDirectory, changeShowNewDirectory] = useState(false)
    const [contents, setContents] = useState({});
    const [displayedContents, setDisplayedContents] = useState({});
    const nav = useNavigate()

    const location = useLocation();
    let path = useParams()['*']

    if (path === undefined){
        path = '/'
    } else {
        path = '/' + path
        if (path.slice(-1) === '/') path = path.slice(0,-1)
    }
    useEffect(() => {
        checkLoginAndRedirect(nav)
        const fetchContents = () => {
            fetch(`/storage/directory?path=${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken().token}`,
                },
                method: 'get',
            })
            .then(response => response.json())
            .then(response => {
                setContents(response)
                setDisplayedContents(response)
            })
        };
        fetchContents();
    }, [update, location]);

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
                            <localSearch />
                        </div>
                        <div className="row mt-3">
                            <Content content={displayedContents} forceupdate={updateView}/>
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

