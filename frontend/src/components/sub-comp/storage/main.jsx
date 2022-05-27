import { motion } from "framer-motion";
import { useState } from "react";
import Files from './files';
import Upload from './upload';
import Search from '../multi/search';

export default function Main(){
    const [update, forceupdate] = useState(0);
    const [search, changesearch ]= useState('|<>|');
    return(
        <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1  }}
        viewport={{ once: true }}>
            <div className="container">
                <div className="row mt-3">
                    <Search changesearch={changesearch} />
                </div>
                <div className="row mt-3">
                    <Files update={update} params={search}/>
                </div>
                <div className="row mt-3">
                    <Upload forceupdate={forceupdate} update={update}/>
                </div>
            </div>
        </motion.div>
    );
};

