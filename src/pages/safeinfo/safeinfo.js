import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './safeinfo.css';
import { useLocation } from 'react-router-dom';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { SAFE_ABI } from '../../contracts/config';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

function TxRow(props) {
    async function voteTx(approve) {
        await props.contract.methods
            .voteTransaction(props.safeAddress, props.TxNumber, approve)
            .send({ from: props.contract.defaultAccount });
    }

    async function executeTx() {
        await props.contract.methods
            .executeTransaction(props.safeAddress, props.TxNumber)
            .send({ from: props.contract.defaultAccount });
    }

    if (props.forVotes >= props.minVotes) {
        return (
            <tr>
                <td>{props.TxNumber}</td>
                <td>{props.Recepient}</td>
                <td>{props.TxAmount}</td>
                <td>
                    {props.forVotes}/{props.minVotes}
                </td>

                <div>
                    <td>
                        <Button
                            className='approve-deny'
                            onClick={() => executeTx()}
                        >
                            Execute
                        </Button>
                    </td>
                </div>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>{props.TxNumber}</td>
                <td>{props.Recepient}</td>
                <td>{props.TxAmount}</td>
                <td>
                    {props.forVotes}/{props.minVotes}
                </td>

                <div>
                    <td>
                        <Button
                            className='approve-deny'
                            onClick={() => voteTx(true)}
                        >
                            Approve
                        </Button>

                        <Button
                            className='approve-deny'
                            onClick={() => voteTx(false)}
                        >
                            Deny
                        </Button>
                    </td>
                </div>
            </tr>
        );
    }
}
// Table content here.
// const TxTableContent = [
//     { TxNumber: '1', Recepient: '23243', TxAmount: '0.31', Votes: '2' },
// ];

// function AddNewRow(props){

//     TxTableContent.push({TxNumber: props.TxNumber, Recepient: props.Recepient, TxAmount: props.TxAmount, Votes: props.Votes })
// }

function Balance(props) {
    return (
        <div className='balance' style={{ display: 'inline' }}>
            <h5>Balance: {props.balance} ETH</h5>
        </div>
    );
}

function SafeAddress(props) {
    return (
        <div className='safeAddress' style={{ display: 'inline' }}>
            <h5>Safe Address: {props.address}</h5>
        </div>
    );
}

function PendingTxTable(props) {
    const TxTableContent = props.transactions;
    return (
        <div>
            <h1 className='fs-3 fw-normal' style={{ paddingTop: 20 }}>
                Pending Transactions
            </h1>
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
                    {TxTableContent.map((row, index) => (
                        <TxRow
                            TxNumber={index}
                            Recepient={row.destination}
                            TxAmount={row.amount / Math.pow(10, 18)}
                            forVotes={row.forVotes}
                            minVotes={row.minVotes}
                            contract={props.contract}
                            safeAddress={props.safeAddress}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

function AddNewTx(props) {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');

    async function addTransaction() {
        // TODO: add a field for min votes and use it here
        const wei = Math.round(amount * Math.pow(10, 18));
        const minVotes = 2;
        props.contract.methods
            .addTransaction(props.safeAddress, address, wei, duration, minVotes)
            .send({ from: props.metamaskAddress });
    }

    return (
        <div className='add-new-tx mt-5'>
            <h1 className='fs-3 fw-normal'>Add new transaction</h1>
            <div>
                <FloatingLabel label='Address' className='mb-3'>
                    <Form.Control
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label='Amount' className='mb-3'>
                    <Form.Control
                        placeholder='Amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label='Duration' className='mb-3'>
                    <Form.Control
                        placeholder='Duration'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </FloatingLabel>

                <Button
                    onClick={() => {
                        addTransaction();
                    }}
                >
                    Add Transaction
                </Button>
            </div>
        </div>
    );
}

export default function SafeInfo(props) {
    const [safeName, setSafeName] = useState(null);
    const [balance, setBalance] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);
    const [ownerAddress, setOwnerAddress] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const location = useLocation();
    const { address: safeAddress } = location.state;
    const safeContract = new web3.eth.Contract(SAFE_ABI, safeAddress);

    async function getSafeName() {
        const safeName = await safeContract.methods.safeName().call();
        setSafeName(safeName);
    }

    async function getBalance() {
        const balance = await props.web3.eth.getBalance(safeAddress);
        setBalance(balance / Math.pow(10, 18));
    }

    // TODO: will be diff for each transaction... needs updating
    // async function getMinVotes() {
    //     // const minVotes = await props.contract.methods.minVotes().call();
    //     setMinVotes(2);
    // }

    async function getTransactionCount() {
        const transactionCount = await safeContract.methods
            .transactionCount()
            .call();
        return transactionCount;
    }

    async function getTransactions() {
        const transactionCount = await getTransactionCount();
        console.log(`getting ${transactionCount} transactions...`);
        setTransactionCount(transactionCount);
        const newTransactions = [];
        for (var i = 0; i < transactionCount; i++) {
            const newTransaction = await safeContract.methods
                .transactions(i)
                .call();
            newTransactions.push(newTransaction);
        }
        setTransactions(newTransactions);
    }

    async function checkIfOwner(address) {
        try {
            const isOwner = await safeContract.methods.isOwner(address).call();
            console.log('Owner ' + address + '? ' + isOwner);
            setIsOwner(isOwner);
        } catch (e) {
            console.log('Owner ' + address + '? Unauthorized user');
            setIsOwner(true); // remove this
        }
    }

    useEffect(() => {
        getSafeName();
        getBalance();
        // getMinVotes();
        getTransactions();
        checkIfOwner(props.metamaskAddress);
        console.log(`address=${safeAddress}`);
    }, [props.metamaskAddress]);

    return (
        <div>
            {isOwner ? (
                <div
                    className='safe-info-content mt-3'
                    style={{ paddingBottom: 15 }}
                >
                    <span class='safe-name'>{safeName}</span>

                    <Balance balance={balance} />
                    <SafeAddress address={safeAddress} />
                    <PendingTxTable
                        contract={props.contract}
                        safeAddress={safeAddress}
                        transactions={transactions}
                    />
                    <AddNewTx
                        contract={props.contract}
                        metamaskAddress={props.metamaskAddress}
                        safeAddress={safeAddress}
                    />
                </div>
            ) : (
                <div className='safe-info-content mt-3'>
                    <span class='safe-name'>{safeName}</span>
                    <br />
                    <span>Unauthorized user</span>
                </div>
            )}
        </div>
    );
}
