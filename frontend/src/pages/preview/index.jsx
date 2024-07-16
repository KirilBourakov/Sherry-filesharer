import { useLocation } from 'react-router-dom';
import { images, text, pdf } from '../../scripts/fileExtensions'

export default function Router(props){
    let location = useLocation();
    const extension = location.state.extension

    if (images.includes(extension)){
        // image preview component
    }

    if (text.includes(extension)){
        // text preview component
    }

    if (pdf.includes(extension)){
        // pdf preview component
    }

    // add support for video, and other file types
}