import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Files from './files';
import Upload from './upload';
import Search from '../../components/multi/search';
import New from './new'
import { getToken } from "../../scripts/authentication";

export default function Main(){
    const [update, forceupdate] = useState(0);
    const [search, changesearch ]= useState('|<>|');
    const [directory, changeDirectory] = useState(null)
    const [showUpload, changeShowUpload] = useState(false)

    const updateView = () => {
        forceupdate(update + 1)
        return
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
                            <Files update={update} params={search}/>
                        </div>
                    </div>
                    {showUpload &&
                        <Upload update={updateView} pathId={directory} showUpload={changeShowUpload}/>
                    }
                </div>
            </motion.div>
            <New showUpload={changeShowUpload}/>
        </>
    );
};

