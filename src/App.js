import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />

          <Route path="/profile" element={<Profile />} />
          {/*           <Route path='/podcasts' element={<Podcasts/>}/>
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
