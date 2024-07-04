import Standeredlink from './standeredlink';
import LoginLogout from './login-logout';
import Logindropdown from './Logindropdown';
import UserName from './UserName';

export default function SiteNavbar(){
    return(
        <div>
            {window.localStorage.getItem('key') &&        
                <UserName />    
            }
        </div>     
    );
};
