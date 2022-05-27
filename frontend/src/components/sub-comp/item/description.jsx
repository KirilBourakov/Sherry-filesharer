import { useParams } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import url from './../../utils/url';
import SharedWith from './SharedWith';
import Tags from './Tags';
import Owner from './owner';
import Edit from './edit';
import FileName from './FileName';

export const updateContext = createContext()
export const tagContext = createContext()
export const shareContext = createContext()

export default function Description(){
    const [key, changekey] = useState(window.localStorage.getItem('key'));
    const [userdata, setuserdata] = useState([]);
    const [update, forceupdate] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        getdata();
      }, [id, update]);

    const getdata = () => {
        fetch(`${url()}/api/item/userdata/${id}`, {
            headers: {
                "Authorization": `Token ${key}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            setuserdata(data)
        });
    };
    return(
        <>
            <p>Description of <strong> <FileName file={userdata.file} /> </strong></p>
            <hr className='description'/>
            <div className="d-flex flex-column">
                <div className='d-flex'><strong className='me-1 align-self-center'>Owner:</strong>
                    <Owner content={userdata.owner_name}/>
                </div>

                <div className='d-flex'><strong className='me-1 align-self-center'>Shared with:</strong>
                    <SharedWith data={userdata.shared_with} public={userdata.public}/>
                </div>
                
                <div className='d-flex'><strong className='me-1 align-self-center'>Tags:</strong>
                    <Tags tags={userdata.tags} />
                </div>

                <updateContext.Provider value={[update, forceupdate]}>
                    <tagContext.Provider value={userdata.tags}>
                        <shareContext.Provider value={[userdata.public, userdata.shared_with]}>
                        
                            <Edit/>

                        </shareContext.Provider>
                    </tagContext.Provider>
                </updateContext.Provider>
            </div>
        </>
        
    );
};