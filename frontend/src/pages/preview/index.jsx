import { useLocation } from 'react-router-dom';
import { images, text, pdf } from '../../scripts/fileExtensions'
import { motion } from 'framer-motion';
import Description from './description';

export default function Router(props){
    let location = useLocation();
    const extension = location.state.extension

    if (images.includes(extension)){
        // image preview component
    } else if (text.includes(extension)){
        // text preview component
    } else if (pdf.includes(extension)){
        // pdf preview component
    } else {
        // cannot preview component
    }

    // use effect to get file info

    // add support for video, and other file types
    return(
        <motion.div 
        initial={{ opacity:0 }}
        whileInView={{ opacity:1  }}
        viewport={{ once: true }}
        className="container">
            <div className="row">
                <div className="col-12 col-md-8 mt-3">
                    {/* filepreview */}
                </div>
                <div className="col-12 col-md-4 mt-3">
                    <Description />
                </div>
            </div>
        </motion.div>
    );
}