import UserName from './UserName';
import SearchBar from './search';
import HamburgerMenu from './hamburger';
import { useState, useEffect } from "react"
import { isLoggedIn } from '../../scripts/authentication'

export default function Navbar(){
    const [visible, setVisible] = useState()
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isAuthenticated = await isLoggedIn();
            setAuthenticated(isAuthenticated);
        };
        checkLoginStatus();
    }, []);
    return(
        <nav className={`navbar navbar-expand-lg navbar-light sticky-top bg-light ${visible ? '' : 'shadow'}`}>
            {authenticated ? 
                <>
                    <UserName />
                    <div className='ms-auto'>
                        <HamburgerMenu visible={visible} setVisible={setVisible}>
                            <SearchBar/>
                            <button type="button" class="btn btn-primary mx-2" href="/storage">Storage</button>
                            <button type="button" class="btn btn-primary me-2" href="/logout">Logout</button>    
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
