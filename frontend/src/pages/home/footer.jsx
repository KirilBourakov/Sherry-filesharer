import { motion } from 'framer-motion';
import Contact from './contact';
import AboutSherry from './AboutSherry'

export default function Footer(){
    return(
        <motion.footer
        className="bg-dark text-white"
        initial={{ y:-50, opacity:0 }}
        whileInView={{ y:0, opacity:1  }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        >
            <div className="container">
                <div className="row">
                    <AboutSherry/>
                    <Contact/>
                </div>
            </div>
        </motion.footer>
    );
};