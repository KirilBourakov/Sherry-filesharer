import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Standeredlink from './standeredlink';
import LoginLogout from './login-logout';
import Logindropdown from './Logindropdown';
import UserName from './UserName';

export default function SiteNavbar(){
    return(
        <Navbar bg="light" expand={false}>
            <Container fluid>
                <Navbar.Brand href="/">Sharry</Navbar.Brand>
                {window.localStorage.getItem('key') &&        
                    <UserName />    
                }
                <Navbar.Toggle aria-controls="offcanvasNavbar" />

                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Standeredlink link='/' content='Home' />
                        <Standeredlink link='/public' content='Public' />
                        <Standeredlink link='/storage' content='Storage' />
                        <Standeredlink link='/Shared-with-me' content='Shared with me' />
                        

                        <LoginLogout />
                        <NavDropdown.Divider />
                        {window.localStorage.getItem('key') &&        
                            <Logindropdown />    
                        }
                        
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
        
    );
};
