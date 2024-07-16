import { createRef, useState } from 'react';

export default function createDirectory(props){
    const nameRef = createRef();
    const submit = () => {
        return
    }

    return (
        <div className="position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} onClick={props.show}>
            <div className="text-center bg-primary p-5 pt-3 border border-primary border-5 rounded-3 text-light" onClick={(e) => { e.stopPropagation(); }}>
                <h1>Create Folder</h1>

                <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input className='form-control' type="text" size="lg" ref={nameRef} />
                </div>

                <button 
                    type='button'
                    className='btn btn-primary-dark mx-auto'
                    style={{ width: 'fit-content' }}
                    onClick={(e) => {submit(e)}}
                >
                    Upload
                </button>
            </div>
        </div>
    )  
}