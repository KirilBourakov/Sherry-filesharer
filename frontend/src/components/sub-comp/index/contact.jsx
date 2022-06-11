import { createRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import AlertDanger from '../../AlertDanger';
import url from './../../utils/url';

export default function Contact(){
    const [dangerAlert, setDangerAlert] = useState(false);
    const [dangerText, setDangerText] = useState('')

    const emailRef = createRef()
    const subjectRef = createRef()
    const contentRef = createRef()

    const sendemail = async () => {
        const email = emailRef.current.value
        const subject = subjectRef.current.value
        const content = contentRef.current.value
        
        if (findDataErrors([email,subject,content])) {
            alertError('Please fill all fields.')
            return;
        }
        
        const response = await (await fetch(`${url()}/api/sendmail`, {
            method: 'POST',
            body: JSON.stringify({
                EmailBack: email,
                Subject: subject,
                Content: content
            })
        }
        )).json();

        checkresponse(response)
    }

    const findDataErrors = (li) => {
        console.log(li);
        li.forEach(data => {
            if (data === '') {
                console.log(data);
                return true
            }
        });
        return false
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
            alertError(response.message)
            return;
        }
        alertError( "I'm sorry, something went wrong. Please wait, then try again. Or, reach out directly via my email.")
    }

    const alertError = (msg) => {
        setDangerText(msg)
        setDangerAlert(true);
        setTimeout(() => { 
            setDangerAlert(false);
        }, 2000);
    }

    return (
        <div className='col-7 mt-3 contact'>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Your email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                <Form.Text className="text-muted">
                This will only be used to respond to your email.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" ref={subjectRef}/>
            </Form.Group>
            
            <FloatingLabel label="Comments">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '250px' }}
                ref={contentRef}
                />
            </FloatingLabel>
            
            <Button variant="primary mt-2" type="button" onClick={sendemail}>
                Submit
            </Button>
            </Form>

            <AlertDanger 
                text={dangerText} 
                see={dangerAlert}
                animate={{ opacity: 1, x: 0 }}
                change={{ opacity: 0, x: -50 }}
            />
        </div>
    );
};