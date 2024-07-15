import { useState } from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdUploadFile, MdOutlineDriveFolderUpload } from "react-icons/md";

export default function New(){
    const [dropdown, setDropdown] = useState(false)

    return(
        <IconContext.Provider value={{ className: "text-light" }}>
            <div className="m-2 footer position-fixed end-0 bottom-0" style={{ end: '20px' }}>
                <div className="bg-primary rounded-circle shadow" onClick={() => {setDropdown(!dropdown)}}>
                    <MdOutlineAdd size={85}/>
                </div>
                <div className="position-absolute bottom-100 start-50 translate-middle-x rounded p-2 text-light">
                    {dropdown &&
                        <div class="bg-primary position-relative rounded-2">
                            <NewButton text={'Upload a file'}>
                                <MdUploadFile size={50}/>
                            </NewButton>
                            <NewButton text={'Create Folder'}>
                                <MdOutlineDriveFolderUpload size={50}/>
                            </NewButton>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#D2042D" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
                        </div>
                    }
                </div>
            </div>
        </IconContext.Provider>
    )
}

function NewButton(props){
    return(
        <div className="p-1 d-flex">
            <div className='p-1'>
                {props.children}
            </div>
            <div className='p-1'>
                {props.text}
            </div>
        </div>
    )
}