import Slide from './slide'
import slideData from './../../resources/data/slides.json'

export default function Slides(){
    let rotation = -1
    return(
        <div className='d-flex flex-column'>
            {slideData.map(function(data) {
                rotation *= -1
                return (<Slide 
                    title={data.title}
                    content={data.content}
                    image={data.img}
                    rotation={rotation}
                />)
            })}
        </div>
    );
};