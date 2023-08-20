import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import InputComponent from "../../common/Input";
import { toast } from "react-toastify";
import Button from "../../common/Button";
import Fileinput from "../../common/Input/Fileinput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, auth, db } from "../../../fireBase";
import { addDoc, collection } from "firebase/firestore";

const CreateAPodCastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  // let dispatch = useDispatch();
  // let navigate = useNavigate();

  async function handleSubmit() {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      // upload files and get downloadable links,
      try {
        //banner Imaage uploading stage

        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
          // `podcasts-banner-image`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        //display Image uploading Stage:
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
          // `podcasts-banner-image`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        //adding data into doc:
        const podCastData = {
          title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        await addDoc(collection(db, "podcasts"), podCastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("PodCast Created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
      // create a new doc in a new collection called podcasts
      // save this new podcast episodes states in our podcasts
    } else {
      toast.error("Please Enter all the values");
      setLoading(false);
    }
  }

  const displayImageHandleFunc = (file) => {
    setDisplayImage(file);
  };
  const bannerImageHandleFunc = (file) => {
    setBannerImage(file);
  };

  return (
    <div className="input-wrapper">
    <h1>Create A Podcast</h1>
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
        accept={"images/*"}
        id={"display-custom-image"}
        fileHandleFunc={displayImageHandleFunc}
        text="Import Display Image"
      />

      <Fileinput
        accept={"images/*"}
        id={"banner-custom-image"}
        fileHandleFunc={bannerImageHandleFunc}
        text="Import Banner Image"
      />
      <Button
        text={loading ? "loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreateAPodCastForm;
