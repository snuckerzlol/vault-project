import Navbar from '../navbar'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import './safeinfo.css'
import { Form, FloatingLabel } from 'react-bootstrap';

function TxRow(props) {

    return (

        <tr>
          <td>{props.TxNumber}</td>
          <td>{props.Recepient}</td>
          <td>{props.TxAmount}</td>
          <td>{props.Votes}/5</td>
          <td>
            <Button className='approve-deny'>Approve</Button>
            <Button className='approve-deny'>Deny</Button>
          </td>
        </tr>
    )
}
// Table content here.
const TxTableContent = [

    {TxNumber: '1', Recepient:'23243', TxAmount:'0.31', Votes:'2' }
]

// function AddNewRow(props){

//     TxTableContent.push({TxNumber: props.TxNumber, Recepient: props.Recepient, TxAmount: props.TxAmount, Votes: props.Votes })
// }

function Balance(props) {

    return (

        <div className='balance'>
            <h5>Balance: {props.bal}</h5>
        </div>
    )
}

function PendingTxTable() {

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
                    {TxTableContent.map((row) => <TxRow TxNumber= {row.TxNumber} Recepient={row.Recepient} TxAmount={row.TxAmount} Votes={row.Votes}/>)}
                    
                </tbody>

            </Table>

        </div>
    )
}   

function AddNewTx() {

    return (

        <div className='add-new-tx mt-5'>

            <h1 className='fs-3 fw-normal'>Add new transaction</h1>
            <div>

                <FloatingLabel label="Address" className="mb-3">
                    <Form.Control placeholder="Address" />
                </FloatingLabel>

                <FloatingLabel label="Amount" className="mb-3">
                    <Form.Control placeholder="Amount" />
                </FloatingLabel>

                <Button>Add Transaction</Button>

            </div>
        </div>
    )
}

export default function SafeInfo() {

    return (

        <div> 

            <Navbar/>

            <div className='safe-info-content mt-3'>
                <Balance bal='5000'/>

                <PendingTxTable/>

                <AddNewTx/>

            </div>

        </div>
    )

}