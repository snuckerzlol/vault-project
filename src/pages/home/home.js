import {Link} from 'react-router-dom'
import './home.css'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {

    const SafeButton = (props) => { // Button component
        
        return (

            <div className='safebutton'>
                <ButtonGroup size='lg'>
                    <Button> {props.name} </Button>
                </ButtonGroup>
            </div>

        )
        
    }

    return (

        <div>

            <div className='home mt-3'>
                <h1 className='fw-normal'> Home</h1>
                <ButtonGroup>

                    <Link to='/vault-project/createsafe' style={{ textDecoration: 'none' }}>
                        <SafeButton name = 'Create Safe'/>
                    </Link>

                </ButtonGroup>

                <ButtonGroup>

                    <Link to='/vault-project/accesssafe' style={{ textDecoration: 'none' }}>
                        <SafeButton name = 'Access Safe'/>
                    </Link>
                </ButtonGroup>
            </div>

        </div>
    )
}