import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>404 NOT FOUND!</h1>
            <h3>Hey Dear, looks like the page you're looking for is not here, that's all we know!</h3>
            <Link to="/dash" >get back to your dash</Link>
        </div>
    )
}