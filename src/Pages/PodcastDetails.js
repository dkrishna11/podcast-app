import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../fireBase";
import { toast } from "react-toastify";
import Button from "../Components/common/Button";
import EpisodeDetails from "../Components/common/Podcasts/EpisodeDetails";
import AudioPlayer from "../Components/common/Podcasts/AudioPlayer";

const PodcastDetails = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState({});
  const [episode, setEpisode] = useState([]);
  const navigate = useNavigate();
  const [playingFile, setPlayingFile] = useState("");
  useEffect(() => {
    if (id) getData();
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

  useEffect(() => {
    const unsubcribe = onSnapshot(
      query(collection(db, "podcasts", id, "episode")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisode(episodesData);
      },
      (error) => {
        console.error("Error Fetching Episode:", error);
      }
    );

    return () => {
      unsubcribe();
    };
  }, [id]);
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h1
                style={{
                  width: "100%",
                  marginBottom: "0px",
                  textAlign: "left !important",
                }}
              >
                {podcast.title}
              </h1>

              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  width={"300px"}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <div className="banner-image">
              <img src={podcast.bannerImage} alt={podcast.title} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 style={{ width: "100%", textAlign: "left !important" }}>
              Episodes
            </h1>
            {episode.length > 0 ? (
              <>
                {episode.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      <div>
        {playingFile && (
          <AudioPlayer audioSrc={playingFile} Image={podcast.displayImage} />
        )}
      </div>
    </div>
  );
};

export default PodcastDetails;
