import './createsafe.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup, FloatingLabel } from 'react-bootstrap';
import React from 'react';

export default class CreateSafe extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            addresses: [], 
            name: '',
            temp: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitSafe = this.submitSafe.bind(this);
    }
    
    handleChange(e) {
        this.setState({temp: e.target.value});
        console.log(this.state.temp)
        e.preventDefault();
    }
    
    handleSubmit(e) {
        this.setState(prevState => ({
            addresses: [...prevState.addresses, this.state.temp]
          }))
        console.log(this.state.addresses);
        e.preventDefault();
    }

    async submitSafe(e) {
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.addresses);
        const address = await this.props.contract.methods.createNewSafe(this.state.name, this.state.addresses).send({ from: this.props.metamaskAddress });
        console.log(address);
        // <SafeInfo
        //     web3={this.props.web3}
        //     contract={this.props.contract}
        //     metamaskAddress={this.props.metamaskAddress}
        // />
    }

    render() {

        return (

            <div>
    
                <div className='content'>
    
                    <h5 className='title fs-3 fw-normal'>Connect your personal safes</h5>
                    <Form onSubmit={this.submitSafe}>
    
                        <FloatingLabel label='Safe Name' className='mb-3'>
                            <Form.Control
                                placeholder='Safe Name'
                                onChange={(e) => this.setState({name: e.target.value})}
                                />
                        </FloatingLabel>
    
                        <InputGroup>
                            <Button variant="outline-secondary" className='mb-3' onClick={this.handleSubmit}>
                                +
                            </Button>
                            <FloatingLabel label='Address' className='mb-3'>
                                <Form.Control
                                    name='Address'
                                    placeholder='Address'
                                    onChange={this.handleChange}/>
                            </FloatingLabel>
                        </InputGroup>

                            {this.state.addresses.map((a, index) => (
                            
                                <h6 key={index} className='mb-1'>
                                    {a}
                                </h6>
                                ))
                            }
                         
                        <Button size='lg' type='submit'>Submit</Button>
                    </Form>
    
                </div>
            </div>
        )
    }
}




// export default function CreateSafe() {

//     return (

//         <div>

//             <div className='content'>

//                 <h5 className='title fs-3 fw-normal'>Connect your personal safes</h5>
//                 <Form>

//                     <FloatingLabel label='Safe Name' className='mb-3'>
//                         <Form.Control
//                             placeholder='Safe Name'/>
//                     </FloatingLabel>

//                     <InputGroup>
//                         <Button variant="outline-secondary" className='mb-3' onClick={handleSubmit}>
//                             +
//                         </Button>
//                         <FloatingLabel label='Address' className='mb-3'>
//                             <Form.Control
//                                 name='Address'
//                                 placeholder='Address'
//                                 onChange={handleChange}/>
//                         </FloatingLabel>
//                     </InputGroup>
            
//                     <FloatingLabel label='Number of votes' className='mb-3'>
//                         <Form.Control
//                             placeholder='Number of votes'/>
//                     </FloatingLabel>
                    
//                     <Button size='lg' type='submit'>Submit</Button>
//                 </Form>

//             </div>
//         </div>
//     )
// }