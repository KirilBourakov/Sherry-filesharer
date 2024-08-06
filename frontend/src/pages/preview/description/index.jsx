import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import SharedWith from './SharedWith';
import Tags from './Tags';
import FileName from './FileName';
import Edit from './edit';
import { AuthContext } from '../../../components/providers/authProvider';

export const updateContext = createContext()
export const tagContext = createContext()
export const shareContext = createContext()

export default function Description({ setFileAccessible }){
    const { authObj, setAuthObj } = useContext(AuthContext)
    const [userdata, setuserdata] = useState(null);
    const [update, forceupdate] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        // TODO: add more precies handling of bad responses (401, 404, etc)
        getdata();
      }, [id, update]);

    const getdata = async () => {
        let response = await fetch(`/storage/fileInfo?file=${id}`, {
            headers: {
                "Authorization": `Token ${authObj.token}`,
            }
        })
        if (response.status !== 200){
            setFileAccessible(false)
            return
        }
    
        response = await response.json()
        setuserdata(response)
    };

    const forceUpdate = () => {
        forceupdate(update+1)
    }
    if (userdata === null){
        return <></>
    }

    return(
        <>
            <p>Description of <strong> <FileName file={userdata.filename} /> </strong></p>
            <hr className='description'/>
            <div className="d-flex flex-column">
                <div className='d-flex'><strong className='me-1 align-self-center'>Owner:</strong>
                    <div className="ms-1 badge bg-success text-wrap align-self-center">
                        {userdata.author_name}
                    </div>
                </div>

                <div className='d-flex'><strong className='me-1 align-self-center'>Shared with:</strong>
                    <SharedWith data={userdata.shared_with} public={userdata.public}/>
                </div>
                
                <div className='d-flex'><strong className='me-1 align-self-center'>Tags:</strong>
                    <Tags tags={userdata.tags} />
                </div>

                {userdata.is_author ?
                        <Edit isPublic={userdata.public} shared_with={userdata.shared_with} tags={userdata.tags} id={id} update={forceUpdate}/>
                    :
                    <>
                        <hr className='description'/>
                        <strong>Only the owner can edit the file</strong>
                    </>
                } 
            </div>
        </>
        
    );
};