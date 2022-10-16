import { Link } from "react-router-dom";

export const BackgroundCovered = '#282c34';
export const BackgroundUncovered = 'white';
export const MessageColorCovered = 'white';
export const MessageColorUncovered = 'black';

export const HighlightColor = 'yellow';
export const LinkColor = '#61dafb';
export const TopbarColor = '#61dafb';

export const GlobalToolBar = () => {
    return (
        <div className = "global-toolbar">
            <Link to = "/vault-project">Login</Link>
            &nbsp;|&nbsp;
            <Link to = "/vault-project/profile">Profile</Link>
            &nbsp;|&nbsp;
            <Link to = "/vault-project/storage">Storage</Link>
            &nbsp;|&nbsp;
            <Link to = "/vault-project/history">History</Link>
        </div>
    )
}
