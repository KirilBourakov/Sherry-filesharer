//css
import './resources/css/custom.scss';

//react & js
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// componenets
import Navbar from './components/navbar';
import Home from './pages/home/';
import CreateAccount from './pages/create-account';
import Login from './pages/login';
import Storage from './pages/storage';
import LogoutView from './pages/logout';
import Item from './pages/preview';
import PublicPath from './pages/public';
import SharedWithMe from './pages/shared/';
import Search from './pages/search';

export const UseKeyHook = createContext()

function App() {
  const [key, setkey] = useState(window.localStorage.getItem('key'))
  return (
    <UseKeyHook.Provider value={setkey}>
      <Router>
        <Navbar/>
        <div>
          <Routes> 

            {/* unprotected routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/search" element={<Search/>}/>

            {/* login/out */}
            <Route path="/Create-account" element={<CreateAccount/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<LogoutView/>}/>
            

            {/* protected routes */}
            <Route path="/item/:id" element={<Item />}/>
            <Route path="/storage" element={<Storage />}/>
            <Route path="/storage/*" element={<Storage />}/>

            {/* old */}
            <Route path="/public" element={key ? <PublicPath /> : <Navigate to="/login"/>}/>
            <Route path='/Shared-with-me' element={key ? <SharedWithMe /> : <Navigate to="/login"/>}/>
              
          </Routes>
        </div>
      </Router>
    </UseKeyHook.Provider>
  );
};

export default App;
