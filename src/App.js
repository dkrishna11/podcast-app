import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "./fireBase";
import { setUser } from "./slices/userSlices";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./Components/common/PrivateRoutes";
import CreateAPodCastPage from "./Pages/CreateAPodCastPage";
import PodCastPage from "./Pages/PodCastPage";
import PodcastDetails from "./Pages/PodcastDetails";
import CreateAnEpisode from "./Pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubcribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubcribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.log("Error fetching user Data: ", error);
          }
        );
        return () => {
          unsubcribeSnapshot();
        };
      }
    });
    return () => {
      unsubcribeAuth();
    };
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodCastPage />} />
            <Route path="/podcast" element={<PodCastPage />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisode />}
            />
          </Route>
          {/*           
            <Route path='/create-podcast' element={<CreatePodcast/>}/>
            <Route path='/postcast/:podcastId' element={<PostcastDetails/>}/>
            <Route path='/podcast/:podcastId/create-episode' element={<CreateEpisode/>}/>
           */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
