import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar() {

    return (

        <nav className="nav"> 

            <Link to='/vault-project/' className="homelink"><h1>Home</h1></Link>
            
        </nav>

    )
}