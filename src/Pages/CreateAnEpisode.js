import React, { useState } from "react";
import Header from "../Components/common/Header";
import { useDispatch } from "react-redux";
import InputComponent from "../Components/common/Input";
import Button from "../Components/common/Button";
import Fileinput from "../Components/common/Input/Fileinput";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage} from "../fireBase";
import { collection, addDoc } from "firebase/firestore";

const CreateAnEpisode = () => {
    const {id} =useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const audioFileHandle=(file)=>{
    setAudioFile(file)
  }

  const handleSubmit=async()=>{
    setLoading(true)
    if((title, desc, audioFile)){
        try{
            // setLoading(true)
            const audioRef=ref(
                storage,
                `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(audioRef, audioFile);

            const audioURL=await getDownloadURL(audioRef);
            const episodeData={
                title:title,
                description:desc,
                audioFile:audioURL
            }

            await addDoc(
                collection(db, "podcasts", id, "episode"),
                episodeData
            );
           
            toast.success("Episode Created Successully");
            setLoading(false)
            navigate(`/podcast/${id}`);
            setTitle("");
            setDesc("")
            setAudioFile("")

        }catch(e){
            toast.error(e.message)
            setLoading(false)
        }

    }
    else{
        toast.error("Please fill all the fields")
        setLoading(false)
    }

  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder="Title"
          type="text"
          required={true}
        />

        <InputComponent
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />

        <Fileinput
          accept={"audio/*"}
          id={"audio-file-input"}
          fileHandleFunc={audioFileHandle}
          text="Upload Audio File"
        />
        <Button
          text={loading ? "loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateAnEpisode;
