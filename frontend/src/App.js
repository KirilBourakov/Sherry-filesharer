//css
import 'bootstrap/dist/css/bootstrap.css';


//react & js
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// componenets
import SiteNavbar from './components/global/Navbar';
import Index from './components/routes/index';
import CreateAccount from './components/routes/create-account';
import Login from './components/routes/login';
import Storage from './components/routes/storage';
import LogoutView from './components/routes/logout-account';
import Item from './components/routes/item';
import PublicPath from './components/routes/public';
import SharedWithMe from './components/routes/SharedWithMe'

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
