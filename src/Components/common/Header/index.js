import "./style.css"
import { NavLink } from "react-router-dom";

const Header=()=>{


    return(
        <div className="navBar">
            <div className="gradient"></div>
            <div className="links">
            <NavLink to="/">SignUp</NavLink>
            <NavLink to="/podcast">Podcasts</NavLink>
            <NavLink to="/create-a-podcast">Start A Podcast</NavLink>
            <NavLink to="/profile">Profile</NavLink>
           </div>
        </div>
    )
}

export default Header;