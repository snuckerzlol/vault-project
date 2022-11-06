import './accesssafe.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Form, FloatingLabel } from 'react-bootstrap';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { SAFE_ABI } from '../../contracts/config';

function SafeUnit(props) {
    return (
        <div className='d-grid gap-2 mb-1'>
            <Button variant='outline-primary' size='lg'>
                <Link
                    to='/vault-project/safeinfo'
                    style={{ textDecoration: 'none' }}
                >
                    <div>{props.name}</div>
                </Link>
            </Button>
        </div>
    );
}

export default function AccessSafe(props) {
    const [safes, setSafes] = useState({});
    useEffect(() => {
        getSafeInfo();
    });

    const getSafeInfo = async () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        const addresses = await props.contract.methods.getSafes().call();
        console.log(`addresses=${addresses}`);
        await Promise.all(
            addresses.map(async (address) => {
                const safeContract = new web3.eth.Contract(SAFE_ABI, address);
                const safeName = await safeContract.methods.safeName().call();
                setSafes((prevState) => {
                    let newSafes = { ...prevState };
                    newSafes.address = safeName;
                    return newSafes;
                });
            })
        );
        console.log(`info=${safes}`);
    };

    return (
        <div>
            <div className='access-safe mt-3'>
                <h1 className='fw-normal fs-3 mb-3'> Access Safe</h1>
                <div className='safeunits'>
                    <SafeUnit name={'Test Safe 1'} />
                </div>

                <div className='add-safe-forms'>
                    <div>
                        <FloatingLabel label='Safe Address' className='mb-3'>
                            <Form.Control placeholder='Safe Address' />
                        </FloatingLabel>

                        <FloatingLabel label='Name' className='mb-3'>
                            <Form.Control placeholder='Name' />
                        </FloatingLabel>

                        <Button>Add</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
