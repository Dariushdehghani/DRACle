import { Link } from "react-router-dom"

export default function Intro(){
    return(
        <>
            <h1>the intro page</h1>
            <Link to="/login" >
                go to login
            </Link>
        </>
    )
}