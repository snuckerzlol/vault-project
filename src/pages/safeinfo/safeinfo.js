import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './safeinfo.css';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function TxRow(props) {
    async function voteTx(approve) {
        console.log(`Address is ${props.contract.defaultAccount}`);
        await props.contract.methods
            .voteTransaction(props.TxNumber, approve)
            .send();
    }

    return (
        <tr>
            <td>{props.TxNumber}</td>
            <td>{props.Recepient}</td>
            <td>{props.TxAmount}</td>
            <td>{props.Votes}/5</td>
            <td>
                <Button className='approve-deny' onClick={voteTx(true)}>
                    Approve
                </Button>
                <Button className='approve-deny' onClick={voteTx(false)}>
                    Deny
                </Button>
            </td>
        </tr>
    );
}
// Table content here.
const TxTableContent = [
    { TxNumber: '1', Recepient: '23243', TxAmount: '0.31', Votes: '2' },
];

// function AddNewRow(props){

//     TxTableContent.push({TxNumber: props.TxNumber, Recepient: props.Recepient, TxAmount: props.TxAmount, Votes: props.Votes })
// }

function Balance(props) {
    return (
        <div className='balance'>
            <h5>Balance: {props.balance}</h5>
        </div>
    );
}

function PendingTxTable(props) {
    return (
        <div>
            <h1 className='fs-3 fw-normal'>Pending Transactions</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Recepient</th>
                        <th>Amount</th>
                        <th>Votes</th>
                        <th>Approve/Deny</th>
                    </tr>
                </thead>

                <tbody>
                    {/* <TxRow TxNumber= '1' Recepient='23243' TxAmount='0.31' Votes='2' />
                    <TxRow TxNumber= '2' Recepient='35278' TxAmount='0.79' Votes='0'/>
                    <TxRow TxNumber= '3' Recepient='99001' TxAmount='0.0004' Votes='1'/> */}
                    {TxTableContent.map((row) => (
                        <TxRow
                            TxNumber={row.TxNumber}
                            Recepient={row.Recepient}
                            TxAmount={row.TxAmount}
                            Votes={row.Votes}
                            contract={props.contract}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

function AddNewTx(props) {
    const[address, setAddress] = useState(null);
    const[amount, setAmount] = useState(null);
    const[duration, setDuration] = useState(null);

    async function addTransaction() {
    }

    return (
        <div className='add-new-tx mt-5'>
            <h1 className='fs-3 fw-normal'>Add new transaction</h1>
            <div>
                <FloatingLabel label='Address' className='mb-3'>
                    <Form.Control
                        placeholder='Address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label='Amount' className='mb-3'>
                    <Form.Control
                        placeholder='Amount'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label='Duration' className='mb-3'>
                    <Form.Control
                        placeholder='Duration'
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                    />
                </FloatingLabel>

                <Button>Add Transaction</Button>
            </div>
        </div>
    );
}

export default function SafeInfo(props) {
    const[safeName, setSafeName] = useState(null);
    const[balance, setBalance] = useState(0);
    const[transactionCount, setTransactionCount] = useState(0);
    const[ownerAddress, setOwnerAddress] = useState(null);
    const[isOwner, setIsOwner] = useState(false);

    async function getSafeName() {
        const safeName = await props.contract.methods.safeName().call();
        setSafeName(safeName);
    }

    async function getBalance() {
        const balance = await props.web3.eth.getBalance(props.contractAddress);
        setBalance(balance);
    }

    async function getTransactionCount() {
        const transactionCount = await props.contract.methods
            .transactionCount()
            .call();
        setTransactionCount(transactionCount);
    }

    async function getTransactions() {
        const transactions = await props.contract.methods
            .transactions(0)
            .call();
        console.log(transactions);
    }

    // async function addOwner(address) {
    //     await props.contract.methods.addOwner(address);
    // }

    async function checkIfOwner(address) {
        try {
            const isOwner = await props.walletContract.methods.isOwner(address).call();
            console.log('Owner ' + address + '? ' + isOwner);
            setIsOwner(isOwner);
        } catch (e) {
            console.log('Owner ' + address + '? Unauthorized user');
        }
    }

    useEffect(() => {
        getSafeName();
        getBalance();
        getTransactionCount();
        getTransactions();
        checkIfOwner(props.metamaskAddress);
    }, [props.metamaskAddress]);

    return (
        <div>
            {isOwner ? 
                <div className='safe-info-content mt-3'>
                    <span class='safe-name'>{safeName}</span>
                    <Balance balance={balance} />
                    <PendingTxTable />
                    <AddNewTx />
                    <div className='add-new-tx mt-5'>
                        <h1 className='fs-3 fw-normal'>Add new owner</h1>
                        <div>
                            <FloatingLabel label='Address' className='mb-3'>
                                <Form.Control
                                    placeholder='Address'
                                    value={ownerAddress}
                                    onChange={(e) =>
                                        setOwnerAddress(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                            <Button
                                onClick={() => {
                                    checkIfOwner(ownerAddress);
                                }}
                            >
                                Check Owner
                            </Button>
                        </div>
                    </div>
                </div>
            :
                <div className='safe-info-content mt-3'>
                    <span class='safe-name'>{safeName}</span>
                    <br />
                    <span>Unauthorized user</span>
                </div>
            }
        </div>
    );
}
