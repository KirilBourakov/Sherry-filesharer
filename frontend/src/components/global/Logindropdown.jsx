import { useEffect, useState } from 'react';
import url from './../utils/url';
import Standeredlink from './standeredlink';

export default function Logindropdown(){
    let key = window.localStorage.getItem('key');
    const [files, changefiles] = useState([]);
    useEffect(() => {
        getfile();
      }, []);
    const getfile = () => {
        fetch(`${url()}/api/getfiles/|<>|`, {
            headers: {
                "Authorization": `Token ${key}`,
            }
        })
        .then(response => response.json())
        .then(response => {changefiles(response)})
    
    };
    return(
        <>
            {files &&
                files.map((file) =>{
                return(
                <Standeredlink key={file.id} link={`/item/${file.id}`} content={file.file.split('/')[file.file.split('/').length-1].replaceAll('%20', ' ')} />
                )
                })
            }
        </>
    );
    
};