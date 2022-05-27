import { motion } from 'framer-motion';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import url from './../../utils/url';

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -50 },
};

export default function Contact(){
    const [sentisOpen, changesentisOpen] = useState(true);
    return (
        <div className='col-7 mt-3 contact'>
            <Form>
            <Form.Group className="mb-3" controlId="EmailBack">
                <Form.Label>Your email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                This will only be used to respond to your email.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" />
            </Form.Group>
            
            <FloatingLabel controlId="content" label="Comments">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '250px' }}
                />
            </FloatingLabel>
            
            <Button variant="primary mt-2" type="button" onClick={() => {sendemail(changesentisOpen)}}>
                Submit
            </Button>
            </Form>
            <motion.div
                className="mt-2 alert" 
                id="SentAlert"
                role="alert"
                animate={sentisOpen ? "open" : "closed"}
                variants={variants}
            >
            </motion.div>
        </div>
    );
};

async function sendemail(changefunc){
    let u = url();
    let response = await (await fetch(`${u}/api/sendmail`, {
        method: 'POST',
        body: JSON.stringify({
            EmailBack: document.getElementById('EmailBack').value,
            Subject: document.getElementById('subject').value,
            Content: document.getElementById('content').value
        })
    }
    )).json();
    // check if email was sent
    let alert = document.getElementById('SentAlert')
    if (response.message === 'Email sent'){
        document.getElementById('EmailBack').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('content').value = '';
        
        //change html
        alert.classList.add('alert-success');
        alert.innerHTML = 'Sent!';

    } else if (response.message === 'Content is missing' || response.message === 'Sender is missing' || response.message === 'Subject is missing') {
        alert.classList.add('alert-danger');
        alert.innerHTML = response.message;
    } else{
        alert.classList.add('alert-danger')
        alert.innerHTML = "I'm sorry, something went wrong. Please wait, then try again. Or, reach out directly via my email.";
    }
    // show, then hide the message
    changefunc(true);
    setTimeout(() => { 
        changefunc(false);
        setTimeout(() => {
            alert.classList = 'mt-2 alert'
        }, 1200);
    }, 2000);
    
}