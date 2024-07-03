import { motion } from 'framer-motion';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import AlertSuccess from './../../components/AlertSuccess';

export default function AboutSherry() {
    const [alertView, changealertView] = useState(false);

    const githubRedirect = () => {
        const url = 'https://github.com/thepug432/CS50w-final-project-Sherry-filesharer-';
        window.open(url, '_blank').focus();
    }

    const copy = () => {
        navigator.clipboard.writeText('kirbou06012@gmail.com');
        changealertView(true);
        setTimeout(() => { changealertView(false) }, 2000);
    }

    return (
        <div className='col'>
            <h1 className="display-6 my-2">About Sharry</h1>
            <motion.p 
            whileHover={{ scale: 1.04 }} 
            whileTap={{ scale: 0.96 }} 
            onClick={copy}
            >
                In all seriousness, Sharry is my CS50W final project.
                If you'd like to contact me, please reach out either using 
                that form to the right, or by emailing me at <b> kirbou06012@gmail.com</b>,
                which is my professional email.
            </motion.p>
            <motion.p 
            className='my-2'
            whileHover={{ scale: 1.04 }} 
            whileTap={{ scale: 0.96 }} 
            onClick={githubRedirect}
            >
                On the other hand, you can see the github page 
                <a className='text-white' href='https://github.com/thepug432/CS50w-final-project-Sherry-filesharer-'> here.</a> 
            </motion.p>
            <p className='mt-2'>
                The technolagies used in this website are the following:
            </p>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Frontend</th>
                        <th>Backend</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><dfn title="Main frontend library used.">React</dfn></td>
                        <td><dfn title="Base Backend framework.">Django</dfn></td>
                    </tr>
                    <tr>
                        <td><dfn title="React animations addon.">Framer Motion</dfn></td>
                        <td><dfn title="Used for API's.">Django REST framework</dfn></td>
                    </tr>
                    <tr>
                        <td><dfn title="Popular icons for React projects.">React Icons</dfn></td>
                        <td><dfn title="User authentication for the REST framework.">Dj-Rest-Auth</dfn></td>
                    </tr>
                    <tr>
                        <td><dfn title="Bootstrap based React componenets.">React Bootstrap</dfn></td>
                        <td><dfn title="Needed for dj-rest-auth registration.">Django allauth</dfn></td>
                    </tr>
                    <tr>
                        <td><dfn title="Bootstrap CSS framework.">Bootstrap</dfn></td>
                        <td><dfn title="Used to send emails.">YagMail</dfn></td> 
                    </tr>
                    
                </tbody>
            </Table>
            

             {/*copy alert */}
             <AlertSuccess 
                text={'Copied to clipboard!'}
                see={alertView}
                animate={{ opacity: 1, x: 0 }}
                change={{ opacity: 0, x: -50 }}
             />
        </div>
    );
};