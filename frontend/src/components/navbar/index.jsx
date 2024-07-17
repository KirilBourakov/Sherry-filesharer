import UserName from './UserName';
import SearchBar from './search';
import HamburgerMenu from './hamburger';
import { useState } from "react"
import { isLoggedIn } from '../../scripts/authentication'

export default function Navbar(){
    const [visible, setVisible] = useState()
    return(
        <nav className={`navbar navbar-expand-lg navbar-light sticky-top bg-light ${visible ? '' : 'shadow'}`}>
            {isLoggedIn() ? 
                <>
                    {/* <UserName /> */}
                    <div className='ms-auto'>
                        <HamburgerMenu visible={visible} setVisible={setVisible}>
                            <SearchBar/>
                            <div>123</div>  
                        </HamburgerMenu>
                    </div>
                </>   
                :
                <>
                    <a className="navbar-brand ms-2" href="/">Sherry</a>
                    <HamburgerMenu visible={visible} setVisible={setVisible}>
                            <SearchBar/>
                            <a className="ms-auto btn btn-primary rounded" href="/login">Login/Sign Up</a>
                    </HamburgerMenu>
                </>
            }
        </nav>  
    );
};
