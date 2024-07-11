import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import File from '../../components/file';
import Search from '../../components/multi/search';

export default function Public(){
    const [parm, changeparm] = useState('|<>|');
    const [data, setdata ] = useState([]);
    useEffect(() =>{
        const getPublicFiles = () =>{
            fetch(`api/sharedwithme/${parm}`, {
                headers: {
                    "Authorization": `Token ${window.localStorage.getItem('key')}`,
                }
            })
            .then(response => response.json())
            .then(response => {setdata(response)})
        }
        getPublicFiles()
    }, [parm]);

    return(
        <motion.div 
        initial={{ opacity:0 }}
        whileInView={{ opacity:1  }}
        viewport={{ once: true }}
        className="container">
            <div className='row mt-3'>
                <Search changesearch={changeparm}/>
            </div>
            
            <div className='row'>
                {data.map(d => {
                    return(
                        <div key={d.id} className='pt-1 ps-1 col-6 col-md-4'>
                            <File content={d.file} fileid={d.id} />
                        </div>
                    
                     )
                })}
            </div>

        </motion.div>
    );
};