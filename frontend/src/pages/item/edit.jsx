import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditTags from './EditTags'
import EditShared from './EditShared'
import Delete from './Delete'

export default function Edit(props){
    const [key, changekey] = useState(window.localStorage.getItem('key'));
    const [ownerCheck, changeOwnerCheck] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`api/OwnerCheck/${id}`, {
            headers: {
                "Authorization": `Token ${key}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            changeOwnerCheck(data.response)
        });
    }, []);

    if (ownerCheck){
        return(
            <div className='d-flex flex-column'>
                <hr className='description'/>
                <strong className='me-1 align-self-center'>Edit Tags</strong>
                <EditTags />
                <hr className='description'/>
                <strong className='me-1 align-self-center'>Edit Users</strong>
                <EditShared />
                <hr className='description'/>
                <strong className='me-1 align-self-center'>DANGER!</strong>
                <Delete />
            </div>
        );
    } else{
        return(
            <>
            <hr className='description'/>
            <strong>Only the owner can edit the file</strong>
            </>
        );
    };
    
    
};
