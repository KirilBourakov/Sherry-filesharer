import { TbFaceIdError } from "react-icons/tb";

export default function FileNotAccessible({ error=1 }){
    if (error === 1){
        return(
                <div class="container">
                    <div class="row">
                        <div class="col">
                        
                        </div>
                        <div class="col">
                            <div className="text-center">
                                <TbFaceIdError size={150}/>
                            </div>
                            <p className="text-center">We're very sorry. Something went wrong. Please make sure the file exists, and you have permision to acess it, then try again.</p>
                        </div>
                        <div class="col">
                        
                        </div>
                    </div>
                </div>
        )
    }
}