import File from '../../components/multi/file'
import { useEffect, useState } from 'react';

export default function Files(props){
    const [key, changekey] = useState(window.localStorage.getItem('key'));
    const [data, setdata] = useState(false);
    
    useEffect((accesskey=key, parm=props.params) => {
        const fetchFiles = () => {
            fetch(`api/getfiles/${parm}`, {
                headers: {
                    "Authorization": `Token ${accesskey}`,
                }
            })
            .then(response => response.json())
            .then(response => {setdata(response)})
        };
        fetchFiles();
    }, [props.update, props.params]);
    
    return(
        <div className="container">
            <div className="row">
                
                {data &&
                    data.map(d => {
                    return(
                        <div key={d.id} className='pt-1 ps-1 col-6 col-md-4'>
                            <File content={d.file} fileid={d.id} />
                        </div>
                
                    )
                    })
                }
                 
            </div>     
        </div>
    );
};
