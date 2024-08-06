import { useContext, useEffect, useState } from "react";
import{ Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { getToken, clearUser, logout } from '../../scripts/authentication'
import { AuthContext } from "../providers/authProvider";

export default function UserName() {
    const [user, setUser] = useState([])
    const { authObj, setAuthObj } = useContext(AuthContext)
    
    const nav = useNavigate()
    // TODO: rework this component
    useEffect(() =>{
        const getUser = async () =>{
            const response = await fetch(`/user/get`, {
                headers: {
                    "Authorization": `Token ${authObj.token}`,
                }
            })
            if (response.status !== 200){
                logout()
                alert('Seems something went wrong. We have done our best to log you out. Please Login again.')
                return nav("/login")
            }
            const body = await response.json()
            setUser(body)
        }
        getUser()
    }, []);
    return(
        <motion.div className="me-auto" whileHover={{ scale: 1.1 }}>
        <Link to='/storage'>
        <h5 className="text-muted my-auto">
            {user &&
                <>{user.username}
                <i className="ms-1 font-italic"><small>#{user.pk}</small></i>
                </>
            }
            
        </h5>
        </Link>
        </motion.div>
    )
};