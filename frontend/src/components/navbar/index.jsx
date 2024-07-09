import UserName from './UserName';
import SearchBar from './search';
import HamburgerMenu from './hamburger';

export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            {window.localStorage.getItem('key') ? 
                <>
                    <UserName />
                    <div className='ms-auto'>
                        <HamburgerMenu >
                            <SearchBar/>
                            <div>123</div>  
                        </HamburgerMenu>
                    </div>
                </>   
                :
                <>
                    <a className="navbar-brand ms-2" href="/">Sherry</a>
                    
                    <HamburgerMenu>
                        <SearchBar/>
                        <a className="ms-auto btn btn-primary rounded" href="/login">Login/Sign Up</a>
                    </HamburgerMenu>
                </>
            }
        </nav>  
    );
};
