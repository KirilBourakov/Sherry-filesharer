//css
import 'bootstrap/dist/css/bootstrap.css';


//react & js
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// componenets
import SiteNavbar from './components/global/Navbar';
import Index from './pages/home/index';
import CreateAccount from './pages/create-account/create-account';
import Login from './pages/login/login';
import Storage from './pages/storage/storage';
import LogoutView from './pages/logout/logout-account';
import Item from './pages/item/item';
import PublicPath from './pages/public/publicRoute';
import SharedWithMe from './pages/shared/SharedWithMe'

export const UseKeyHook = createContext()

function App() {
  const [key, setkey] = useState(window.localStorage.getItem('key'))
  return (
    <UseKeyHook.Provider value={setkey}>
      <Router>
        <SiteNavbar/>
        <div>
          <Routes> 

            {/* idex */}
            <Route path="/" element={<Index/>} />

            {/* login/out */}
              <Route path="/Create-account" element={<CreateAccount/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<LogoutView/>}/>

            {/* main routes */}
            {/* <Route path="/storage" element={<Storage/>}/> */}
            <Route path="/item/:id" element={key ? <Item /> : <Navigate to="/login"/>}/>
            <Route path="/public" element={key ? <PublicPath /> : <Navigate to="/login"/>}/>
            <Route path='/Shared-with-me' element={key ? <SharedWithMe /> : <Navigate to="/login"/>}/>
            <Route path="/storage" element={key ? <Storage /> : <Navigate to="/login"/>} />
              



          </Routes>
        </div>
      </Router>
    </UseKeyHook.Provider>
  );
};

export default App;
