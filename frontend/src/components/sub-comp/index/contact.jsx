import { motion } from 'framer-motion';
import { createRef, useState } from 'react';
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
    const emailRef = createRef()
    const subjectRef = createRef()
    const contentRef = createRef()
    const alertRef = createRef()

    const sendemail = async () => {
        const response = await (await fetch(`${url()}/api/sendmail`, {
            method: 'POST',
            body: JSON.stringify({
                EmailBack: emailRef.current.value,
                Subject: subjectRef.current.value,
                Content: contentRef.current.value
            })
        }
        )).json();

        checkresponse(response)
    }

    const checkresponse = (response) => {
        if (response.message === 'Email sent') {
            emailRef.current.value = ''
            subjectRef.current.value = ''
            contentRef.current.value = ''
            alert('success', 'Sent!')
            return;
        }
        if (response.message) {
            alert('fail', response.message)
            return;
        }
        alert('fail', "I'm sorry, something went wrong. Please wait, then try again. Or, reach out directly via my email.")
    }

    const alert = (type, msg) => {
        const element = document.getElementById('SentAlert')

        if (type === 'success') {
            alert.classList.add('alert-success');
            alert.innerHTML = msg;
        } else{
            alert.classList.add('alert-danger');
            alert.innerHTML = msg;
        }

        changesentisOpen(true);
            setTimeout(() => { 
                changesentisOpen(false);
                setTimeout(() => {
                    alert.classList = 'mt-2 alert'
                }, 1200);
            }, 2000);
    }

    return (
        <div className='col-7 mt-3 contact'>
            <Form>
            <Form.Group className="mb-3" ref={emailRef}>
                <Form.Label>Your email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                This will only be used to respond to your email.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" ref={subjectRef}>
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" />
            </Form.Group>
            
            <FloatingLabel ref={contentRef} label="Comments">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '250px' }}
                />
            </FloatingLabel>
            
            <Button variant="primary mt-2" type="button" onClick={sendemail}>
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