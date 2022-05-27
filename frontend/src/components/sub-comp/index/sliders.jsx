import Slidestart from './slidestart';
import Slideend from './slideend';

export default function Sliders(){
    return(
        <div className='d-flex flex-column'>
            <Slidestart 
                title="Why Choose us?" 
                content="Sherry is an organization devoted to our clients. 
                We provide fast, secure PDF transfers. 
                We are definintly not one guy, doing his as a personal project."
                image='choose'
            />
            <Slideend
                title="About us."
                content="We are a dedicated team of individuals, blazing a path 
                through the PDF sharing ecosystem. We strongly belive that the customer
                is always right, and we have a dedicated support team to aid with anything
                you may need."
                image='about'
            />
            <Slidestart 
                title="Simplicity. Reimagined."
                content="In a world where speed is key, Sherry is your best bet.
                With fast, reliable servers (which ever I can get for free), 
                Sherry provides consumers  with everything they need, in one spot."
                image='simple'
            />

            <Slideend
                title="Perfect for all uses."
                content="Sharry is a platform fit for every need a user may have. 
                With our dedicated team, and our fast speeds we are leading the market in
                terms of PDF sharing and storage."
                image='uses'
            />
        </div>
        
    );
};