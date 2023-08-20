import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../fireBase";
import { toast } from "react-toastify";
import Button from "../Components/common/Button";

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (id)  getData();
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setPodcast({
          id: id,
          ...docSnap.data(),
        });
        toast.success("Podcast Found!");
      } else {
        toast.error("No such Document");
        navigate("/podcast");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                width:"100%",
                marginBottom:"2rem"
            }}>
            <h1 style={{ width: "100%", textAlign: "left !important" }}>
              {podcast.title}
            </h1>

            <Button
            width={"300px"}
            text={"Create Episode"}
            onClick={()=>{
                navigate(`/podcast/${id}/create-episode`)
            }}/>
            </div>
            <div className="banner-image">
              <img src={podcast.bannerImage} alt={podcast.title} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 style={{ width: "100%", textAlign: "left !important" }}>
              Episodes
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default PodcastDetails;
