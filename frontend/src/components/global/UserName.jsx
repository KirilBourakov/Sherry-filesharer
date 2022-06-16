import { useEffect, useState } from "react";
import{ Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

export default function UserName() {
    const [user, setUser] = useState([])
    const nav = useNavigate()
    useEffect(() =>{
        const getUser = () =>{
            fetch(`api/getUser`, {
                headers: {
                    "Authorization": `Token ${window.localStorage.getItem('key')}`,
                }
            })
            .then(response => response.json())
            .then(response => {
                setUser(response);
                if (response.detail === "Invalid token."){
                    alert('Seems something went wrong. We have done our best to log you out. Please Login again.');
                    window.localStorage.removeItem('key');
                    return nav("/");   
                }
            })
        }
        getUser()
    }, []);
    return(
        <motion.div className="me-auto" whileHover={{ scale: 1.1 }}>
        <Link to='/storage'>
        <h5 className="text-muted my-auto">
            {user.username} 
            <i className="ms-1 font-italic"><small>#{user.pk}</small></i>
        </h5>
        </Link>
        </motion.div>
    )
};