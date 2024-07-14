import File from '../../components/file'
import { useEffect, useState } from 'react';
import { checkLoginAndRedirect } from '../../scripts/authentication'
import { useNavigate } from 'react-router-dom'
import { getToken } from './../../scripts/authentication'

export default function Contents(props){
    const [contents, setContents] = useState({});
    const nav = useNavigate();
    
    useEffect((parm=props.params) => {
        checkLoginAndRedirect(nav)
        const fetchContents = () => {
            fetch(`/storage/getDirectoryContents`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken().token}`,
                },
                method: 'get',
            })
            .then(response => response.json())
            .then(response => {setContents(response); console.log(response);})
        };
        fetchContents();
    }, [props.update, props.params]);
    
    return(
        <div className="container">
            <div className='row'>
                {contents.directories &&
                    contents.directories.map(d => {
                        return(
                            <div key={d.id}>{d.directory_name}</div>
                        )
                    })
                }
            </div>
            <div className="row">
                {contents.files &&
                    contents.files.map(d => {
                    return(
                            <div key={d.id} className='pt-1 ps-1 col-6 col-md-4'>
                                <File filename={d.filename} fileid={d.id} />
                            </div>
                        )
                    })
                }
                 
            </div>     
        </div>
    );
};
