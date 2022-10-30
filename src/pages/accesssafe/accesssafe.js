import './accesssafe.css'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { Form, FloatingLabel } from 'react-bootstrap';

function SafeUnit(props) {

    return (
        <div className="d-grid gap-2 mb-1">
            <Button variant="outline-primary" size="lg">
                <Link to= '/vault-project/safeinfo' style={{ textDecoration: 'none' }}>
                    <div>
                        {props.name}
                    </div>
                </Link>
            </Button>
            
        </div>
    )
}


export default function AccessSafe(props) {

    return (

        <div>
            <div className='access-safe mt-3'>

                <h1 className='fw-normal fs-3 mb-3'> Access Safe</h1>
                <div className='safeunits'>
                    <SafeUnit name={'Test Safe 1'}/>
                </div>

                <div className='add-safe-forms'>
                    <div>
                        <FloatingLabel label="Safe Address" className="mb-3">
                            <Form.Control placeholder="Safe Address" />
                        </FloatingLabel>

                        <FloatingLabel label="Name" className="mb-3">
                            <Form.Control placeholder="Name" />
                        </FloatingLabel>

                        <Button>Add</Button>
                    </div>
                </div>
            </div>

        </div>
    )

}