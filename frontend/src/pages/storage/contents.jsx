import File from '../../components/file'
import Folder from '../../components/folder';
import { useEffect, useState } from 'react';
import { checkLoginAndRedirect } from '../../scripts/authentication'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../scripts/authentication'
import { useLocation } from 'react-router-dom';

export default function Contents(props){
    const [contents, setContents] = useState({});
    const nav = useNavigate();
    const location = useLocation();
    
    useEffect((parm=props.params) => {
        checkLoginAndRedirect(nav)
        const fetchContents = () => {
            fetch(`/storage/directory?path=${props.directory}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken().token}`,
                },
                method: 'get',
            })
            .then(response => response.json())
            .then(response => {setContents(response)})
        };
        fetchContents();
    }, [props.update, props.params, location]);
    
    return(
        <div className="container">
            <div className='row'>
                {contents.directories &&
                    contents.directories.map(d => {
                        return(
                            <Folder key={d.id} name={d.directory_name} path={d.path} forceupdate={props.forceupdate}/>
                        )
                    })
                }
            </div>
            <div className='row'>
                {contents.files &&
                    contents.files.map(d => {
                    return(
                            <File key={d.id} filename={d.filename} fileid={d.id} />
                        )
                    })
                }
                 
            </div>     
        </div>
    );
};
