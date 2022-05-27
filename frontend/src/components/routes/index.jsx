import Jumbatron from '../sub-comp/index/jumbatron';
import Sliders from '../sub-comp/index/sliders';
import Footer from '../sub-comp/index/footer';
import './../../resources/css/index-styles.css';

export default function Index(){
    return(
        <>
            <Jumbatron/>
            <Sliders/>
            <Footer/>
        </>
    );
};