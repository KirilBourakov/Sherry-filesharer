import { useState } from "react"

export default function HamburgerMenu(props){
    const [visible, setVisible] = useState()
    const toggle = () => {
        setVisible(!visible)
    }

    return(
        <>
            <button 
                className="navbar-toggler" 
                type="button" data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
                onClick={toggle}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${visible ? 'show' : 'collapse'} navbar-collapse p-2`} id="navbarSupportedContent">
                {props.children}
            </div>
        </>
    )
}