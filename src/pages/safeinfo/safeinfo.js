import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './safeinfo.css';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function TxRow(props) {
    async function voteTx(approve) {
        await props.contract.methods.voteTransaction(approve).send();
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

function AddNewTx() {
    return (
        <div className='add-new-tx mt-5'>
            <h1 className='fs-3 fw-normal'>Add new transaction</h1>
            <div>
                <FloatingLabel label='Address' className='mb-3'>
                    <Form.Control placeholder='Address' />
                </FloatingLabel>

                <FloatingLabel label='Amount' className='mb-3'>
                    <Form.Control placeholder='Amount' />
                </FloatingLabel>

                <FloatingLabel label='Duration' className='mb-3'>
                    <Form.Control placeholder='Duration' />
                </FloatingLabel>

                <Button>Add Transaction</Button>
            </div>
        </div>
    );
}

export default function SafeInfo(props) {
    const [safeName, setSafeName] = useState('');
    const [balance, setBalance] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);

    async function getSafeName() {
        const safeName = await props.walletContract.methods.safeName().call();
        setSafeName(safeName);
    }

    async function getBalance() {
        const balance = await props.web3.eth.getBalance(props.contractAddress);
        setBalance(balance);
    }

    async function getTransactionCount() {
        const transactionCount = await props.walletContract.methods
            .transactionCount()
            .call();
        setTransactionCount(transactionCount);
    }

    async function getTransactions() {
        const transactions = await props.walletContract.methods
            .transactions(0)
            .call();
        console.log(transactions);
    }

    useEffect(() => {
        getSafeName();
        getBalance();
        getTransactionCount();
        getTransactions();
    }, []);

    return (
        <div>
            <div className='safe-info-content mt-3'>
                <span class='safe-name'>{safeName}</span>
                <Balance balance={balance} />
                <PendingTxTable contract={props.walletContract} />
                <AddNewTx /> // Add props here
            </div>
        </div>
    );
}
