import './createsafe.css'
import Navbar from '../navbar'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

export default function CreateSafe() {

    return (

        <div>

            <div className='content'>

                <h5 className='title fs-3 fw-normal'>Connect your personal safes</h5>
                <Form>

                    <InputGroup size='lg'>
                        <Button variant="outline-secondary">
                            +
                        </Button>
                        <FormGroup>
                            <FormControl size='lg' placeholder='Safe Name' ></FormControl>
                        </FormGroup>

                    </InputGroup>

                    <FormGroup className='formbox'>
                        <FormControl size='lg' placeholder=''></FormControl>
                    </FormGroup>

                    <FormGroup className='voteformbox'>
                        <FormControl size='lg' placeholder='Number of votes'></FormControl>
                    </FormGroup>
                    <Button size='lg'>Submit</Button>
                </Form>

            </div>
        </div>
    )

}