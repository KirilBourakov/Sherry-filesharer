import{ Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Standeredlink(props){
    return(
        <Link 
        className='text-dark' 
        to={props.link}
        >
        <motion.div
        className='p-1'
        whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
            color: '#fff',
            backgroundColor: '#dc3545'
        }}
        whileTap={{ scale: 0.95 }}>
        {props.content}
        </motion.div>
        </Link>
    );
};