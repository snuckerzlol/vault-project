import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar(props) {

    return (

        <nav className="nav"> 

            <Link to='/vault-project/' className="homelink"><h1>Home</h1></Link>
            <Link onClick={props.connectTo} className="walletlink"><h1>Connect Wallet</h1></Link>
        </nav>

    )
}