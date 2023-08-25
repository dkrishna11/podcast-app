import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../fireBase";
import { setPodCasts } from "../slices/podCastSlice";
import PodcastCard from "../Components/common/Podcasts/PodCastCard";
import InputComponent from "../Components/common/Input";

const PodCastPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const unsubcribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        // dispatch(setPodcasts(podCastData));
        dispatch(setPodCasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts: ", error);
      }
    );
    return () => {
      unsubcribe();
    };
  }, [dispatch]);

  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h2>Discover PodCasts</h2>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "2rem" }}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts"}</p>
        )}
      </div>
    </>
  );
};

export default PodCastPage;
