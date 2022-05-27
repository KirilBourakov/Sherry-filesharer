import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import url from './../../utils/url';
import Description from './description';

export default function MainFile(){
    const [key, changekey] = useState(window.localStorage.getItem('key'));
    const [data, setdata] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getfile();
      }, [id]);

    const getfile = () => {
        fetch(`${url()}/api/item/${id}`, {
            headers: {
                "Authorization": `Token ${key}`,
            }
        })
        .then(response => response.blob())
        .then(data => {
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
            setdata(url)
        });
    };

    return(
        <motion.div 
        initial={{ opacity:0 }}
        whileInView={{ opacity:1  }}
        viewport={{ once: true }}
        className="container">
            <div className="row">
                <div className="col-12 col-md-8 mt-3">
                    <iframe src={data} id='pdf' type="application/pdf" className='pdf' title='pdf'> </iframe>
                </div>
                <div className="col-12 col-md-4 mt-3">
                    <Description/>
                </div>
            </div>
        </motion.div>
    );
};