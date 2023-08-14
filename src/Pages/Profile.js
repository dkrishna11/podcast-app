import { useSelector } from "react-redux"
import Header from "../Components/common/Header"


const Profile =()=>{
    let userData=useSelector(state=>state.user.user)
    console.log("Profile: ",userData)
    return (
        <div>
            <Header/>
            <h1>{userData.name}</h1>
            <h1>{userData.email}</h1>
            <h1>{userData.uid}</h1>
        </div>
    )
}

export default Profile