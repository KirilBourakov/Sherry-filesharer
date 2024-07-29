import File from '../../components/file'
import Folder from '../../components/folder';
import { useEffect, useState } from 'react';
import { checkLoginAndRedirect } from '../../scripts/authentication'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../scripts/authentication'
import { useLocation } from 'react-router-dom';

export default function Contents({content, forceupdate}){

    return(
        <div className="container">
            <div className='row'>
                {content.directories &&
                    content.directories.map(d => (
                        d.show ? (
                            <Folder key={d.id} name={d.directory_name} path={d.path} forceupdate={forceupdate}/>
                        ) : null
                    ))
                }
            </div>
            <div className='row'>
                {content.files &&
                    content.files.map(d => (
                        d.show ? (
                            <File key={d.id} filename={d.filename} fileid={d.id} />
                        ) : null  
                    ))
                }      
            </div>     
        </div>
    );
};
