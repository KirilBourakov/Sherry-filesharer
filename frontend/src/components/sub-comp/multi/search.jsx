import { motion } from 'framer-motion'

const variants = {
    animatesearch:{
        scale: 1.1,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse', 
            duration: .3
        }
    }
};

export default function Search(props){
    return(
        <form>
            <div className="row">
                <div className="col-3 p-0">
                    <div className="form-group">
                        <input type="text" className="form-control" id="search" placeholder="Search" onChange={() => {search(props.changesearch)}} />
                    </div>
                </div>

                <div className="col">
                    <div className="form-group">
                        <motion.button 
                        type="button" 
                        className="btn btn-danger"
                        whileHover={'animatesearch'}
                        variants={variants}
                        >Search</motion.button>
                    </div>
                </div>
            </div>
        </form>
    );
};

function search(changeparm) {
    let userparm = document.getElementById('search').value.trim();
    if (userparm === ''){
        changeparm('|<>|');
    }else{
        changeparm(userparm);
    };
    
};