import { useSelector } from "react-redux";
import Header from "../Components/common/Header";
import Button from "../Components/common/Button";
import { auth } from "../fireBase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../Components/common/Loader";

const Profile = () => {
  let userData = useSelector((state) => state.user.user);
  console.log("Profile: ", userData);
  if (!userData) {
    return <Loader />;
  }
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <Header />
      <div className="profile-details">
        <h2>{userData.name}</h2>
        <h2>{userData.email}</h2>
        <Button text={"logout"} onClick={handleLogout} width="200px"/>
      </div>
    </div>
  );
};

export default Profile;
